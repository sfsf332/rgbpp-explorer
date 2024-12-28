'use client'

import { Trans } from '@lingui/macro'
// import dayjs from 'dayjs'
// import { sum } from 'lodash-es'
import { Box, HStack, styled, VStack } from 'styled-system/jsx'

import { IfBreakpoint } from '@/components/if-breakpoint'
import { TextOverflowTooltip } from '@/components/text-overflow-tooltip'
import { Table, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { XudtLogoLoader } from '@/components/xudt-logo-loader'
// import { DATE_TEMPLATE } from '@/constants'
// import { RgbppCoinsQuery } from '@/gql/graphql'
import { formatNumber } from '@/lib/string/format-number'

type CoinType = {
  info: {
    symbol: string | null
    id: string
    name: string | null
    decimals: number | null
    icon: string | null
    tags: string[]
  }
  quote: {
    totalSupply: string | null
    holderCount: {
      network: 'ckb' | 'btc' | 'doge' | 'unknown'
      count: number
    }[]
    price: string | null
    marketCap: string | null
    volume24h: string | null
    circulatingSupply: string | null
    fdv: string | null
    priceChange24h: number | null
    txCount24h: number
  }
}


export function CoinList<T extends CoinType>({ coins }: { coins: T[] | undefined }) {

  return (
    <IfBreakpoint breakpoint="lg" fallback={<CoinListGrid coins={coins} />}>
      <Table.Root w="100%" tableLayout="fixed">
        <Table.Head backgroundColor={'bg.input'}>
          <Table.Row>
            <Table.Header w="200px">
              <Trans>Coin</Trans>
            </Table.Header>
            <Table.Header w="100px">
              <Trans>Holders</Trans>
            </Table.Header>
            <Table.Header w="100px">
              <Trans>Price</Trans>
            </Table.Header>
            <Table.Header w="120px">
              <Trans>Txns(24H)</Trans>
            </Table.Header>
            <Table.Header w="120px">
              <Trans>Volume(24H)</Trans>
            </Table.Header>
            <Table.Header w="140px">
              <Trans>Circulating Supply</Trans>
            </Table.Header>
            <Table.Header w="140px">
              <Trans>Total Supply</Trans>
            </Table.Header>
            <Table.Header w="160px">
              <Trans>Market Cap</Trans>
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {coins?.map((coin) => {
            return (
              <Table.Row key={coin.info.id}>
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
                      <XudtLogoLoader symbol={coin.info.symbol+''} size={{ width: '32px', height: '32px', fontSize: '14px' }} />
                    )}
                    <TextOverflowTooltip label={coin.info.symbol}>
                      <Text maxW="200px" truncate cursor="pointer">
                        {coin.info.symbol}
                      </Text>
                    </TextOverflowTooltip>
                  </Link>
                </Table.Cell>
                <Table.Cell>{formatNumber(coin.quote.holderCount.reduce((sum, holder) => sum + holder.count, 0))}</Table.Cell>
                <Table.Cell>${formatNumber(coin.quote.price)}</Table.Cell>
                <Table.Cell>{formatNumber(coin.quote.txCount24h)}</Table.Cell>
                <Table.Cell>${formatNumber(coin.quote.volume24h)}</Table.Cell>
                <Table.Cell>{formatNumber(coin.quote.totalSupply, coin.info.decimals||1)}</Table.Cell>
                <Table.Cell>{formatNumber(coin.quote.totalSupply, coin.info.decimals||1)}</Table.Cell>
                <Table.Cell>${formatNumber(coin.quote.marketCap)}</Table.Cell>
                {/* <Table.Cell>{coin.deployedAt ? dayjs(coin.deployedAt).format(DATE_TEMPLATE) : '-'}</Table.Cell>*/}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </IfBreakpoint>
  )
}

export function CoinListGrid<T extends CoinType>({ coins }: { coins: T[] | undefined }) {
  return (
    <VStack gap={0} w="100%">
      {coins?.map((coin) => {
        return (
          <Link
            href={`/assets/coins/${coin.info.id}`}
            display="grid"
            w="100%"
            gap="16px"
            gridTemplateColumns="repeat(2, 1fr)"
            key={coin.info.id}
            p="20px"
            borderBottom="1px solid"
            borderBottomColor="border.primary"
            _hover={{
              bg: 'bg.card.hover',
            }}
          >
            <HStack w="100%" gridColumn="1/3" color="brand">
              {coin.info.icon ? (
                <styled.img w="32px" h="32px" src={coin.info.icon} rounded="100%" />
              ) : (
                <XudtLogoLoader symbol={coin.info.symbol+''} size={{ width: '32px', height: '32px', fontSize: '14px' }} />
              )}
              <TextOverflowTooltip label={coin.info.symbol}>
                <Text maxW="200px" truncate cursor="pointer">
                  {coin.info.symbol}
                </Text>
              </TextOverflowTooltip>
            </HStack>
            {[
              {
                label: <Trans>Holders</Trans>,
                value: formatNumber(coin.quote.holderCount.reduce((sum, holder) => sum + holder.count, 0)),
              },
              {
                label: <Trans>Price</Trans>,
                value: '$' + formatNumber(coin.quote.price),
              },
              {
                label: <Trans>Txns(24H)</Trans>,
                value: formatNumber(coin.quote.txCount24h),
              },
              {
                label: <Trans>Volume(24H)</Trans>,
                value: '$' + formatNumber(coin.quote.volume24h),
              },
              {
                label: <Trans>Circulating Supply</Trans>,
                value: formatNumber(coin.quote.circulatingSupply, coin.info.decimals||1),
              },
              {
                label: <Trans>Total Supply</Trans>,
                value: formatNumber(coin.quote.totalSupply, coin.info.decimals||1),
              },
              {
                label: <Trans>Market Cap</Trans>,
                value: '$' + formatNumber(coin.quote.marketCap),
              },
              // {
              //   label: <Trans>Deploy Time</Trans>,
              //   value: coin.deployedAt ? dayjs(coin.deployedAt).format(DATE_TEMPLATE) : '-',
              // },
            ].map((x, i) => {
              return (
                <VStack fontSize="14px" w="100%" alignItems="start" fontWeight="medium" key={i} gap="4px">
                  <Box color="text.third">{x.label}</Box>
                  <Box>{x.value}</Box>
                </VStack>
              )
            })}
          </Link>
        )
      })}
    </VStack>
  )
}
