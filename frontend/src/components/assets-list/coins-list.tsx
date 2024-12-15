'use client'
import { Trans } from '@lingui/macro'
import { HStack, styled, VStack } from 'styled-system/jsx'

import ChevronRightSVG from '@/assets/chevron-right.svg'
import { Copier } from '@/components/copier'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { TextOverflowTooltip } from '@/components/text-overflow-tooltip'
import { Table, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { XudtLogoLoader } from '@/components/xudt-logo-loader'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

interface CoinInfo {
  icon?: string
  name: string
  symbol: string
  amout: string
  value: string
  typeHash: string
}
export function CoinListUI({ coinList }: { coinList: CoinInfo[] }) {
  return (
    <IfBreakpoint breakpoint="md" fallback={<AddressCoinListMobile coinList={coinList} />}>
      <Table.Root tableLayout="fixed">
        <Table.Head>
          <Table.Row>
            <Table.Header w="200px">
              <Trans>Name</Trans>
            </Table.Header>
            <Table.Header w="155px">
              <Trans>Amount</Trans>
            </Table.Header>
            <Table.Header w="155px">
              <Trans>Value</Trans>
            </Table.Header>
            <Table.Header w="170px">
              <Trans>Contract</Trans>
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {coinList.map((coin, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell>
                  <Link
                    href={`/assets/coins/${coin.typeHash}`}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="text.link"
                    cursor="pointer"
                  >
                    {coin.icon ? (
                      <styled.img w="32px" h="32px" src={coin.icon} rounded="100%" />
                    ) : (
                      <XudtLogoLoader symbol={coin.symbol} size={{ width: '32px', height: '32px', fontSize: '14px' }} />
                    )}
                    <TextOverflowTooltip label={coin.symbol}>
                      <Text maxW="200px" fontSize="16px" fontWeight="600" color="brand" truncate cursor="pointer">
                        {coin.symbol}
                      </Text>
                    </TextOverflowTooltip>
                  </Link>
                </Table.Cell>
                <Table.Cell>{formatNumber(coin.amout)}</Table.Cell>
                <Table.Cell>${formatNumber(coin.value)}</Table.Cell>
                <Table.Cell>
                  <Copier onlyIcon value={coin.typeHash}>
                    <Link
                      href={`/assets/coins/${coin.typeHash}`}
                      display="flex"
                      fontSize="14px"
                      alignItems="center"
                      gap={3}
                      color="text.link"
                    >
                      <IfBreakpoint breakpoint="lg" fallback={truncateMiddle(coin.typeHash, 6, 4)}>
                        {truncateMiddle(coin.typeHash, 10, 10)}
                      </IfBreakpoint>
                    </Link>
                  </Copier>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </IfBreakpoint>
  )
}

export function AddressCoinListMobile({ coinList }: { coinList: CoinInfo[] }) {
  return (
    <VStack gap={0} w="100%">
      {coinList.map((coin) => {
        return (
          <Link
            href={`/assets/coins/${coin.typeHash}`}
            display="flex"
            w="100%"
            gap="16px"
            key={coin.typeHash}
            py="20px"
            pl="8px"
            borderBottom="1px solid"
            borderBottomColor="border.primary"
            _hover={{
              bg: 'bg.card.hover',
            }}
          >
            <HStack w="100%" gap="16px" justify={'space-between'}>
              <HStack>
                {coin.icon ? (
                  <styled.img w="32px" h="32px" src={coin.icon} rounded="100%" />
                ) : (
                  <XudtLogoLoader symbol={coin.symbol} size={{ width: '32px', height: '32px', fontSize: '14px' }} />
                )}
                <Text maxW="200px" color="brand" fontWeight={600} fontSize="14px" truncate cursor="pointer">
                  {coin.symbol}
                </Text>
              </HStack>
              <HStack>
                <VStack gap="0px" alignItems="end">
                  <Text color="text.primary" fontSize="14px">
                    {formatNumber(coin.amout)}
                  </Text>
                  <Text color="text.third" fontSize="12px">
                    ${formatNumber(coin.value)}
                  </Text>
                </VStack>
                <ChevronRightSVG width="24px" height="24px" color='text.third' />
              </HStack>
            </HStack>
          </Link>
        )
      })}
    </VStack>
  )
}