'use client'

import { ReactNode } from 'react'

// import { useInView } from 'react-intersection-observer'
import { Skeleton, SkeletonProps } from '@/components/ui/primitives/skeleton'
import { useCkbTxDetail } from '@/hooks/useRgbppData'
import { CkbTransaction } from '@/types/graphql'

export function CkbTransactionInViewQuery({
  hash,
  children,
  ...props
}: {
  hash: string
  children: (tx: CkbTransaction) => ReactNode
} & SkeletonProps) {
  const { data: tx, isLoading } = useCkbTxDetail(hash)
console.log(tx)
  if (isLoading) {
    return <Skeleton {...props} />
  }

  if (!tx) {
    return null
  }

  return children(tx as unknown as CkbTransaction)
}
