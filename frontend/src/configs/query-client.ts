'use client'

import { QueryClient } from '@tanstack/react-query'

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
}

export const queryClient = new QueryClient(queryClientConfig)
