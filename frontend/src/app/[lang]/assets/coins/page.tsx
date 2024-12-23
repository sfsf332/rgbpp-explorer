'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useQuery } from '@tanstack/react-query'
import { Box, Center, HStack, VStack } from 'styled-system/jsx'

// import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
import { CoinList } from '@/components/coin-list'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { LoadingBox } from '@/components/loading-box'
import { PaginationSearchParams } from '@/components/pagination-searchparams'
import { Text } from '@/components/ui'
import { QueryKey } from '@/constants/query-key'
import { graphql } from '@/gql'
import { graphQLClient } from '@/lib/graphql'
import { resolvePage } from '@/lib/resolve-page'
import { formatNumber } from '@/lib/string/format-number'

const query = graphql(`
  query RgbppCoins($page: Int!, $pageSize: Int!) {
    rgbppCoins(page: $page, pageSize: $pageSize) {
      total
      pageSize
      coins {
        icon
        name
        symbol
        l1HoldersCount: holdersCount(layer: L1)
        l2HoldersCount: holdersCount(layer: L2)
        h24CkbTransactionsCount
        totalAmount
        deployedAt
        decimal
        typeHash
      }
    }
  }
`)

export default function Page({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams: { page?: string }
}) {
  const { i18n } = useLingui()
  const page = resolvePage(searchParams.page)
  const pageSize = 10

  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKey.RgbppCoins, page, pageSize],
    async queryFn() {
      const { rgbppCoins } = await graphQLClient.request(query, {
        page, pageSize
      })
      return rgbppCoins
    },
    staleTime: 1000 * 60 * 5, // 数据保持新鲜5分钟
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (isLoading) {
    return (
      <VStack w="100%" maxW="content" flex={1} gap="32px">
      <Center h="176px" w="100%" rounded="8px" overflow="hidden">
        <LoadingBox />
      </Center>
      </VStack>
    )
  }

  return (
    <VStack w="100%" maxW="content" flex={1} gap="32px">
      <Box bg="bg.card" w="100%" rounded="8px" pb="10px" overflow={'hidden'}>
        <Text fontSize={{ base: '18px', lg: '20px' }} fontWeight="semibold" p={{ base: '20px', lg: '30px' }}>
          {t(i18n)`Total: ${formatNumber(data?.total)} Coins`}
        </Text>
        <CoinList coins={data?.coins} />
      </Box>
      <HStack gap="16px">
        <IfBreakpoint breakpoint="md">
          <Text fontSize="14px">{t(i18n)`Total ${formatNumber(data?.total)} Items`}</Text>
        </IfBreakpoint>
        {data?.total ? (
          <PaginationSearchParams count={data.total} pageSize={pageSize} />
        ) : null}
      </HStack>
    </VStack>
  )
}
