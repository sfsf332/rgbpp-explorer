'use client'

import { Trans } from '@lingui/macro'
import { Box, Grid } from 'styled-system/jsx'

import { Info } from '@/app/[lang]/explorer/ckb/info'
import { ExplorerTxList } from '@/components/explorer-tx-list'
import { Heading } from '@/components/ui'
import { useRgbppTransactions } from '@/hooks/useRgbppData'

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page() {
  const {data:rgbppLatestL2Transactions} = useRgbppTransactions()
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" w="100%" maxW="content" p={{ base: '20px', xl: '30px' }} gap="30px">
      <Info />
      <Box bg="bg.card" rounded="8px" whiteSpace="nowrap" pb="12px" gridColumn="1/3">
        <Heading fontSize="20px" fontWeight="semibold" p="30px"><Trans>Latest L2 RGB++ transaction</Trans></Heading>
        <ExplorerTxList
          txs={rgbppLatestL2Transactions || []}
          txid={(tx) => tx.btcTxid ?? ''}
          type="ckb"
        />
      </Box>
    </Grid>
  )
}
