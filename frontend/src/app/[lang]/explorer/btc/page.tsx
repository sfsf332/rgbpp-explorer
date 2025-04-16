'use client'
import { Trans } from '@lingui/macro'
import { Box, Grid } from 'styled-system/jsx'

// import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
import { Info } from '@/app/[lang]/explorer/btc/info'
import { ExplorerTxList } from '@/components/explorer-tx-list'
import { Heading } from '@/components/ui'
import { useRgbppTransactions } from '@/hooks/useRgbppData'

export default function Page() {
  const {data:rgbppLatestL1Transactions} = useRgbppTransactions()
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" w="100%" maxW="content" p={{ base: '20px', xl: '30px' }} gap="30px">
      <Info  />
      <Box bg="bg.card" rounded="8px" whiteSpace="nowrap" pb="12px" gridColumn="1/3">
        <Heading fontSize="20px" fontWeight="semibold" p="30px"><Trans>Latest L1 RGB++ transaction</Trans></Heading>
        <ExplorerTxList
          txs={rgbppLatestL1Transactions || []}
          txid={(tx) => tx.btcTxid ?? ''}
          type="btc"
        />
      </Box>
    </Grid>
  )
}
