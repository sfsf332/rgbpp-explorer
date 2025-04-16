'use client'

import { Box } from 'styled-system/jsx'

import { BtcTransactionCard } from '@/components/btc/btc-transaction-card'
import { useBtcTransaction } from '@/hooks/useRgbppData'

export function BtcTransactionCardWithQueryInBlock({ txid }: { txid: string }) {
  const { data, isLoading, error } = useBtcTransaction(txid)

  if (isLoading || error || !data?.data) {
    return null
  }

  return (
    <Box w="100%">
      <BtcTransactionCard tx={data.data} />
    </Box>
  )
}
