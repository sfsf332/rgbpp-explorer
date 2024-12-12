'use client'

import { Box, Center, Grid } from 'styled-system/jsx'

import { TransactionInfo } from '@/components/transaction-info'
import { LatestTxnListUI } from '@/components/latest-tx-list/ui'
import { RgbppTransaction } from '@/gql/graphql'
import { Heading } from '@/components/ui'
import { Trans } from '@lingui/macro'
import { graphql } from '@/gql'
import { graphQLClient } from '@/lib/graphql'
import { formatNumber } from '@/lib/string/format-number'
import { FailedFallback } from '@/components/failed-fallback'
import { Loading } from '@/components/loading'
import { useQuery } from '@tanstack/react-query'
import { QueryKey } from '@/constants/query-key'
const query = graphql(`
  query RgbppLatestTransactions($limit: Int!) {
    rgbppLatestTransactions(limit: $limit) {
      txs {
        ckbTxHash
        btcTxid
        leapDirection
        blockNumber
        timestamp
        ckbTransaction {
          outputs {
            txHash
            index
            capacity
            cellType
            lock {
              codeHash
              hashType
              args
            }
            xudtInfo {
              symbol
              amount
              decimal
            }
            status {
              consumed
              txHash
              index
            }
          }
        }
      }
      total
      pageSize
    }
  }
`)
export default async function Page() {
  const { isLoading, data, error } = useQuery({
    queryKey: [QueryKey.LastRgbppTxns],
    async queryFn() {
      return graphQLClient.request(query, {
        limit: 10,
      })
    },
    refetchInterval: 10000,
  })

  if (isLoading) {
    return (
      <Center h="823px">
        <Loading />
      </Center>
    )
  }

  if (error || !data) {
    return (
      <Center h="823px">
        <FailedFallback />
      </Center>
    )
  }
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" w="100%" maxW="content" p={{ base: '20px', xl: '30px' }} gap="30px">
      <TransactionInfo />
      <Box bg="bg.card" rounded="8px" whiteSpace="nowrap" pb="12px" gridColumn="1/3">
        <Heading fontSize="20px" fontWeight="semibold" p="30px" w="100%"  display={'flex'} alignItems={'center'} justifyContent="space-between">
          <Trans>Latest transactions</Trans>
        </Heading>
        <Box p="0px">
          <LatestTxnListUI txs={data.rgbppLatestTransactions.txs as RgbppTransaction[]} />
        </Box>
      </Box>
    </Grid>
  )
}
