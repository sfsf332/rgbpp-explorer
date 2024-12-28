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
  info: {
    symbol: string | null;
    id: string;
    name: string | null;
    decimals: number | null;
    icon: string | null;
};
value: string;
amount: string;
price: string | null;
priceChange24h: number | null;
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
                    href={`/assets/coins/${coin.info.id}`}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    color="text.link"
                    cursor="pointer"
                  >
                    {coin.info.icon ? (
                      <styled.img w="32px" h="32px" src={coin.info.icon} rounded="100%" />
                    ) : (
                      <XudtLogoLoader symbol={coin.info.symbol||''} size={{ width: '32px', height: '32px', fontSize: '14px' }} />
                    )}
                    <TextOverflowTooltip label={coin.info.symbol}>
                      <Text maxW="200px" fontSize="16px" fontWeight="600" color="brand" truncate cursor="pointer">
                        {coin.info.symbol}
                      </Text>
                    </TextOverflowTooltip>
                  </Link>
                </Table.Cell>
                <Table.Cell>{formatNumber(coin.amount)}</Table.Cell>
                <Table.Cell>${formatNumber(coin.value)}</Table.Cell>
                <Table.Cell>
                  <Copier onlyIcon value={coin.info.id}>
                    <Link
                      href={`/assets/coins/${coin.info.id}`}
                      display="flex"
                      fontSize="14px"
                      alignItems="center"
                      gap={3}
                      color="text.link"
                    >
                      <IfBreakpoint breakpoint="lg" fallback={truncateMiddle(coin.info.id, 6, 4)}>
                        {truncateMiddle(coin.info.id, 10, 10)}
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
            href={`/assets/coins/${coin.info.id}`}
            display="flex"
            w="100%"
            gap="16px"
            key={coin.info.id}
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
                {coin.info.icon ? (
                  <styled.img w="32px" h="32px" src={coin.info.icon} rounded="100%" />
                ) : (
                  <XudtLogoLoader symbol={coin.info.id} size={{ width: '32px', height: '32px', fontSize: '14px' }} />
                )}
                <Text maxW="200px" color="brand" fontWeight={600} fontSize="14px" truncate cursor="pointer">
                  {coin.info.id}
                </Text>
              </HStack>
              <HStack>
                <VStack gap="0px" alignItems="end">
                  <Text color="text.primary" fontSize="14px">
                    {formatNumber(coin.amount)}
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