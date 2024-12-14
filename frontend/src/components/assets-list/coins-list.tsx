'use client'
import { Trans } from '@lingui/macro'
import { styled } from 'styled-system/jsx'

import { Copier } from '@/components/copier'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { TextOverflowTooltip } from '@/components/text-overflow-tooltip'
import { Table, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { XudtLogoLoader } from '@/components/xudt-logo-loader'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

interface CoinList {
  icon?: string
  name: string
  symbol: string
  amout: string
  value: string
  typeHash: string
}
export function CoinListUI({ coinList }: { coinList: CoinList[] }) {
  return (
    <Table.Root tableLayout="fixed">
      <Table.Head>
        <Table.Row>
          <Table.Header w={{ base: '200px', lg: '254px' }}>
            <Trans>Name</Trans>
          </Table.Header>
          <Table.Header w="200px">
            <Trans>Amount</Trans>
          </Table.Header>
          <Table.Header w="200px">
            <Trans>Value</Trans>
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
                    <Text maxW="200px" truncate cursor="pointer">
                      {coin.symbol}
                    </Text>
                  </TextOverflowTooltip>
                </Link>

                {/* <CopyIconEl display="inline-block" value={txHash} /> */}
              </Table.Cell>
              <Table.Cell>{formatNumber(coin.amout)}</Table.Cell>
              <Table.Cell>${formatNumber(coin.value)}</Table.Cell>
              <Table.Cell>
                <Copier onlyIcon value={coin.typeHash}>
                  <Link
                    href={`/assets/coins/${coin.typeHash}`}
                    display="flex"
                    fontSize="12px"
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
  )
}
