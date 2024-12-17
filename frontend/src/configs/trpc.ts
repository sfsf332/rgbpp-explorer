import type { TRPCRouter } from '@magickbase/p'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import SuperJSON from 'superjson';

export const trpc = createTRPCReact<TRPCRouter>()

export function getTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: process.env.NEXT_PUBLIC_TRPC_API_URL || 'https://api.magickbase.com/api/trpc',
        transformer: SuperJSON,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRPC_API_KEY}`,
        },
      }),
    ],
  })
}
