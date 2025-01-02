'use client'

import { Trans } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
import { useQuery } from '@tanstack/react-query'
import { Box, Center, Grid, VStack } from 'styled-system/jsx'

import { FailedFallback } from '@/components/failed-fallback'
import { LatestTxnListUI } from '@/components/latest-tx-list/ui'
// import { Loading } from '@/components/loading'
import { LoadingBox } from '@/components/loading-box'
import { Heading, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { QueryKey } from '@/constants/query-key'
// import { graphql } from '@/gql'
// import { RgbppTransaction } from '@/gql/graphql'
// import { graphQLClient } from '@/lib/graphql'
import { formatNumber } from '@/lib/string/format-number'
import { apiFetcher, RGBTransaction } from '@/services/fecthcer'


// const query = graphql(`
//   query RgbppLatestTransactions($limit: Int!) {
//     rgbppLatestTransactions(limit: $limit) {
//       txs {
//         ckbTxHash
//         btcTxid
//         leapDirection
//         blockNumber
//         timestamp
//         ckbTransaction {
//           outputs {
//             txHash
//             index
//             capacity
//             cellType
//             lock {
//               codeHash
//               hashType
//               args
//             }
//             xudtInfo {
//               symbol
//               amount
//               decimal
//             }
//             status {
//               consumed
//               txHash
//               index
//             }
//           }
//         }
//       }
//       total
//       pageSize
//     }
//   }
// `)

export function HomeRgbppTxnsOverview() {
  // const { i18n } = useLingui()
  const { isLoading, data, error } = useQuery({
    queryKey: [QueryKey.LastRgbppTxns],
    async queryFn() {
    //  return graphQLClient.request(query, { limit  : 10 })
    const res = await apiFetcher.fetchRGBTransactions(1, 10, 'time.desc')
    return res?.data.ckbTransactions
    },
    refetchInterval: 10000,
  })

  if (isLoading) {
    return (
      <Center h="176px" w="100%" rounded="8px" overflow="hidden">
        <LoadingBox />
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
    <VStack w="100%" maxW="content" gap={{ base: '20px', lg: '30px' }}>
      <Grid
        w="100%"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={{ base: '20px', md: '30px' }}
        display="none"
      >
        <Box
          bg="bg.card"
          rounded="8px"
          p={{ base: '24px', md: '30px' }}
          display="flex"
          flexDirection="column"
          gap="8px"
        >
          <Text color="text.third" fontSize={{ base: '14px', md: '16px' }}>
            <Trans>Total Transactions</Trans>
          </Text>
          <Text fontSize={{ base: '24px', md: '30px', lg: '36px' }} fontWeight="600">
            {formatNumber(490933495)}
          </Text>
        </Box>

        <Box
          bg="bg.card"
          rounded="8px"
          p={{ base: '24px', md: '30px' }}
          display="flex"
          flexDirection="column"
          gap="8px"
        >
          <Text color="text.third" fontSize={{ base: '14px', md: '16px' }}>
            <Trans>Transactions (24H)</Trans>
          </Text>
          <Text fontSize={{ base: '24px', md: '30px', lg: '36px' }} fontWeight="600">
            {formatNumber(933495)}
          </Text>
        </Box>
      </Grid>

      <Box w="100%" bg="bg.card" flexDir="column" alignItems="center" rounded="8px">
        <Heading fontSize="20px" fontWeight="semibold" p="30px" w="100%" textAlign="center">
          <Trans>Latest transactions</Trans>
        </Heading>
        <Box p="0px">
          {data &&<LatestTxnListUI txs={data as RGBTransaction[]} />}
        </Box>
        <Box p="20px" textAlign="center" display="none">
          <Link href="/transaction/list" color="brand">
            <Trans>View All Transactions</Trans>
          </Link>
        </Box>
      </Box>
    </VStack>
  )
}
