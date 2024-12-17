'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

import { queryClient } from '@/configs/query-client'
import { getTrpcClient,trpc } from '@/configs/trpc'

export function TRPCProvider({ children }: PropsWithChildren) {
  const [trpcClient] = useState(getTrpcClient)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
