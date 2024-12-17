import { trpc } from '@/configs/trpc'

export function useRgbppData() {
  const { data: marketCap } = trpc.rgbpp.marketCap.useQuery()
  const { data: transactionCountRecords } = trpc.rgbpp.transactionCountRecords.useQuery()

  return {
    marketCap,
    transactionCountRecords,
  }
}

export function useAssetInfo(assetId: string) {
  const { data: assetInfo } = trpc.asset.info.useQuery({ assetId })
  const { data: assetQuote } = trpc.asset.quote.useQuery({ assetId })

  return {
    assetInfo,
    assetQuote,
  }
}

export function useAssetHolders(assetId: string, pageSize = 10, pageIndex = 0) {
  const { data: holders } = trpc.asset.holderList.useQuery({
    assetId,
    pageSize,
    pageIndex,
  })

  return holders
}

export function useAssetTransactions(assetId: string, pageSize = 10, pageIndex = 0) {
  const { data: transactions } = trpc.asset.transactionList.useQuery({
    assetId,
    pageSize,
    pageIndex,
  })

  return transactions
}
