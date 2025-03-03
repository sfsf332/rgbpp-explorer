import { useEffect, useState } from 'react'

import { trpc } from '@/configs/trpc'
import { useRgbppHolderCountRecords } from '@/hooks/trpc/useRgbppHolderCountRecords'
import { useRgbppIssueCountRecords } from '@/hooks/trpc/useRgbppIssueCountRecords'

export function useRgbppData() {
  const { data: marketCap } = trpc.rgbpp.marketCap.useQuery()
  const { data: transactionCountRecords } = trpc.rgbpp.transactionCountRecords.useQuery()

  return {
    marketCap,
    transactionCountRecords,
  }
}

export function useRgbppStatisticsOverview() {
  const { data: marketCap, isLoading: isLoadingMarketcap } = trpc.rgbpp.marketCap.useQuery()
  const { data: totalAssets, isLoading: isLoadingTotalAssets } = useRgbppIssueCountRecords()
  const { data: totalHolders, isLoading: isLoadingTotalHolders } = useRgbppHolderCountRecords()
  const [assetCount, setAssetCount] = useState(0)
  const [holdersCount, setHoldersCount] = useState(0)
  useEffect(() => {
    if (totalAssets?.length) {
      setAssetCount(totalAssets[totalAssets.length - 1].total)
    }
  }, [totalAssets])

  useEffect(() => {
    if (totalHolders?.length) {
      setHoldersCount(totalHolders[totalHolders.length - 1].total)
    }
  }, [totalHolders])

  return {
    marketCap: marketCap?.value || 0,
    assetCount,
    holdersCount,
    loadingStatus: {
      isLoadingMarketcap,
      isLoadingTotalAssets,
      isLoadingTotalHolders,
    },
  }
}

// export function useRgbppXudtList(pageSize = 10, pageIndex = 0) {
//   const { data: xudtList, isLoading } = trpc.rgbpp.infoList.useQuery({
//     pageSize,
//     pageIndex,
//   })

//   return {
//     xudtList,
//     isLoading
//   }
// }

export function useAssetInfo(assetId: string) {
  const { data: assetInfo, isLoading } = trpc.rgbpp.info.useQuery({ assetId })
  const { data: assetQuote } = trpc.rgbpp.quote.useQuery({ assetId })
  // console.log(assetInfo)
  // console.log(assetQuote)
  return {
    assetInfo,
    assetQuote,
    isLoading,
  }
}

// export function useAssetInfoList(pageSize = 10, pageIndex = 0) {
//   const { data: assetList } = trpc.rgbpp.infoList.useQuery({
//     pageSize,
//     pageIndex,
//   })

//   return { assetList }
// }
export function useCoinList(pageSize = 10, pageIndex = 0) {
  const { data: assetList } = trpc.rgbpp.coinList.useQuery({
    pageSize,
    pageIndex,
  })

  return { assetList }
}
export function useAssetHolders(assetId: string) {
  const { data: holders } = trpc.rgbpp.topHolders.useQuery({
    assetId,
  })

  return { holders }
}

export function useAssetTransactions(assetId: string, pageSize = 10, pageIndex = 0) {
  const { data: transactions } = trpc.rgbpp.transactionList.useQuery({
    assetId,
    pageSize,
    pageIndex,
  })
  return { transactions }
}
export function useAddressAsset(address: string) {
  const { data: assetInfo } = trpc.rgbpp.addressHoldAssets.useQuery({ address })
  return {
    assetInfo,
  }
}

export function useBtcAddressTransaction(txid: string) {
  const { data: btcTransaction, isLoading, error } = trpc.temp.btc.transaction.useQuery(txid)
  return {
    btcTransaction,
    isLoading,
    error,
  }
}
export function useAddressInfoBTC(address: string){
  const { data: btcInfo, isLoading, error } = trpc.temp.btc.address.useQuery( address)
    return {
      btcInfo,
      isLoading,
      error
    }
  }
