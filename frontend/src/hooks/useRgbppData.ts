'use client'

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
  const { data: marketCap } = trpc.rgbpp.marketCap.useQuery()
  const { data: totalAssets } = useRgbppIssueCountRecords()
  const { data: totalHolders } = useRgbppHolderCountRecords()
  const [assetCount, setAssetCount] = useState(0)
  const [holdersCount, setHoldersCount] = useState(0)

  useEffect(() => {
    if (totalAssets?.length) {
      setAssetCount(totalAssets[totalAssets.length - 1].total)
    }
  }, [totalAssets]);

  useEffect(() => {
    if (totalHolders?.length) {
      setHoldersCount(totalHolders[totalHolders.length - 1].total)
    }
  }, [totalHolders]);

  return {
    marketCap: marketCap?.value || 0,
    assetCount,
    holdersCount,
    isLoading: marketCap === undefined || totalAssets === undefined || totalHolders === undefined
  }
}

export function useRgbppXudtList(pageSize = 10, pageIndex = 0) {
  const { data: xudtList, isLoading } = trpc.rgbpp.infoList.useQuery({
    pageSize,
    pageIndex,
  })

  return {
    xudtList,
    isLoading
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

export function useAssetInfoList(pageSize = 10, pageIndex = 0) {
  const { data: assetList } = trpc.asset.infoList.useQuery({
    pageSize,
    pageIndex,
  })

  return { assetList }
}

export function useAssetHolders(assetId: string, pageSize = 10, pageIndex = 0) {
  const { data: holders } = trpc.asset.holderList.useQuery({
    assetId,
    pageSize,
    pageIndex,
  })

  return { holders }
}

export function useAssetTransactions(assetId: string, pageSize = 10, pageIndex = 0) {
  const { data: transactions } = trpc.asset.transactionList.useQuery({
    assetId,
    pageSize,
    pageIndex,
  })

  return { transactions }
}
