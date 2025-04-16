'use client'

import { ReactNode, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton, SkeletonProps } from '@/components/ui/primitives/skeleton'
import { CkbTransaction } from '@/gql/graphql'
import { useCkbTxDetail } from '@/hooks/useRgbppData'



export function CkbTransactionInViewQuery({
  children,
  hash,
  fallback,
  ...props
}: Omit<SkeletonProps, 'children'> & {
  children: (ckbTransaction: CkbTransaction) => ReactNode
  hash: string
  fallback?: ReactNode
}) {
  const [enabled, setEnabled] = useState(false)
  const [ref] = useInView({
    threshold: 0,
    onChange(view) {
      if (view) setEnabled(true)
    },
  })
  console.log(hash)
  const { data ,isLoading} = useCkbTxDetail(hash)
  if (!data) return fallback

  return (
    <Skeleton ref={ref} isLoaded={!isLoading} minH={!data ? '480px' : 'auto'} w="100%" {...props}>
      {data ? children(data as CkbTransaction) : null}
    </Skeleton>
  )
}
