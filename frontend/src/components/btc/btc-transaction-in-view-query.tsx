'use client'

// import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton, SkeletonProps } from '@/components/ui/primitives/skeleton'
// import { QueryKey } from '@/constants/query-key'
// import { graphql } from '@/gql'
import { BitcoinTransaction, CkbTransaction } from '@/gql/graphql'
import {  useBtcTxs } from '@/hooks/useRgbppData'
// import { graphQLClient } from '@/lib/graphql'


interface Props extends Omit<SkeletonProps, 'children'> {
  txid: string
  children: (
    btcTransaction: BitcoinTransaction,
    ckbTransaction?: Pick<CkbTransaction, 'inputs' | 'outputs'>,
  ) => ReactNode
  fallback?: ReactNode
}

export function BtcTransactionInViewQuery({ txid, children, fallback }: Props) {
  const [enabled, setEnabled] = useState(false)
  const [ref] = useInView({
    threshold: 0,
    onChange(view) {
      if (view) setEnabled(true)
    },
  })

 

  const { data ,isLoading} = useBtcTxs(txid)
  if (!data) return fallback
  return (
    <Skeleton ref={ref} isLoaded={!isLoading} minH={!data ? '480px' : 'auto'} w="100%">
      {data
        ? children(data as unknown as BitcoinTransaction)
        : null}
    </Skeleton>
  )
}
