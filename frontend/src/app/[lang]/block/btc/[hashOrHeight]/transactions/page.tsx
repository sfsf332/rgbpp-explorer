'use client'

import { VStack } from 'styled-system/jsx'

import { BtcTransactionCardWithQueryInBlock } from '@/components/btc/btc-transaction-card-with-query-in-block'
import { useBlockTxs } from '@/hooks/useRgbppData'

export default function Page({
  params: { hashOrHeight },
}: {
  params: { hashOrHeight: string; lang: string }
}) {
  const { data, isLoading, error } = useBlockTxs(hashOrHeight)
  return (
    <VStack w="100%" gap="30px">
      {data?.data?.map((tx: any) => {
        return <BtcTransactionCardWithQueryInBlock txid={tx.hash} key={tx.hash} />
      })}
    </VStack>
  )
}
