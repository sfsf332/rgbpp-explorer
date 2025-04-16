import type { TRPCRouter } from '@magickbase/p'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import SuperJSON from 'superjson'

// 配置 tRPC 客户端
export const trpc = createTRPCReact<TRPCRouter>()

export function getTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: process.env.NEXT_PUBLIC_TRPC_API_URL || 'https://web3-api-testnet.magickbase.com/api/trpc/',
        // @ts-ignore
        transformer: SuperJSON,
        headers() {
          return {
            // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRPC_API_KEY}`,
            origin: 'x-requested-with'
          }
        },
      }),
    ],
  })
}