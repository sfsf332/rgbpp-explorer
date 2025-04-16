'use client'
import { notFound } from 'next/navigation'
import { Key } from 'react'
import { VStack } from 'styled-system/jsx'

import { CkbTransactionCardWithQueryInBlock } from '@/components/ckb/ckb-transaction-card-with-query-in-block'
// import { graphql } from '@/gql'
import { useBlockTxs } from '@/hooks/useRgbppData'


export default  function Page({ params: { hashOrHeight } }: { params: { hashOrHeight: string; lang: string } }) {
  // const data = await graphQLClient.request(query, { hashOrHeight })
  const { data: transactions, isLoading, error } = useBlockTxs(hashOrHeight)
  if (!transactions&&!isLoading) notFound()
  return (
    <VStack w="100%" gap="30px">
      {transactions?.data?.map((tx: { hash: Key | null | undefined; ckbBlock: { timestamp: number } }) => {
        return <CkbTransactionCardWithQueryInBlock key={tx.hash} hash={tx.hash as string} timestamp={tx.ckbBlock?.timestamp} />
      })}
    </VStack>
  )
}
