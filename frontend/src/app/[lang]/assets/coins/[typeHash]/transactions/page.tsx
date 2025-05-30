import { t } from '@lingui/macro'
import { notFound } from 'next/navigation'
import { Box, HStack, VStack } from 'styled-system/jsx'

import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { LatestTxnListUI } from '@/components/latest-tx-list/ui'
import { PaginationSearchParams } from '@/components/pagination-searchparams'
import { Text } from '@/components/ui'
import { graphql } from '@/gql'
import { graphQLClient } from '@/lib/graphql'
import { resolvePage } from '@/lib/resolve-page'
import { formatNumber } from '@/lib/string/format-number'
import type { RgbppTransaction } from '@/types/graphql'

const query = graphql(`
  query RgbppCoinTransactionsByTypeHash($typeHash: String!, $page: Int!, $pageSize: Int!) {
    rgbppCoin(typeHash: $typeHash) {
      transactionsCount
      transactions(page: $page, pageSize: $pageSize) {
        ckbTxHash
        btcTxid
        leapDirection
        blockNumber
        timestamp
        ckbTransaction {
          inputs {
            txHash
            index
            capacity
            status {
              consumed
              txHash
              index
            }
            type {
              codeHash
              hashType
              args
            }
            lock {
              codeHash
              hashType
              args
            }
            xudtInfo {
              symbol
              amount
              decimal
              typeHash
            }
          }
          outputs {
            txHash
            index
            capacity
            status {
              consumed
              txHash
              index
            }
            type {
              codeHash
              hashType
              args
            }
            lock {
              codeHash
              hashType
              args
            }
            xudtInfo {
              symbol
              amount
              decimal
              typeHash
            }
          }
        }
      }
    }
  }
`)

type QueryResponse = {
  rgbppCoin?: {
    transactionsCount: number
    transactions: RgbppTransaction[]
  }
}

export default async function Page({
  params: { typeHash, lang },
  searchParams,
}: {
  params: { typeHash: string; lang: string }
  searchParams: { page?: string }
}) {
  const i18n = getI18nInstance(lang)
  const page = resolvePage(searchParams.page)
  const pageSize = 10
  const response = await graphQLClient.request<QueryResponse>(query, { typeHash, page, pageSize })
  if (!response.rgbppCoin) notFound()

  return (
    <VStack w="100%" maxW="content" gap="32px">
      <Box w="100%" bg="bg.card" rounded="8px" pt={{ base: '10px', md: '30px' }} pb="10px">
        <LatestTxnListUI txs={(response.rgbppCoin.transactions).map(tx => ({
          ...tx,
          btc: { txid: tx.btc?.txid ?? null }
        })) ?? []} />
      </Box>

      <HStack gap="16px" mt="auto" p="30px">
        <IfBreakpoint breakpoint="md">
          <Text fontSize="14px">{t(
            i18n,
          )`Total ${formatNumber(response.rgbppCoin.transactionsCount ?? undefined)} Items`}</Text>
        </IfBreakpoint>
        <PaginationSearchParams count={response.rgbppCoin.transactionsCount ?? 0} pageSize={pageSize} />
      </HStack>
    </VStack>
  )
}
