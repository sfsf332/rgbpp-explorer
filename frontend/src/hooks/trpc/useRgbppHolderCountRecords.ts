import { useMemo } from 'react'

import { trpc } from '@/configs/trpc'

interface HolderCountRecord {
  status: {
    timestamp: number;
  };
  network: 'ckb' | 'btc' | 'doge';
  count: number;
}

export function useRgbppHolderCountRecords() {
  const { data: holderCountRecordsRaw } = trpc.rgbpp.holderCountRecords.useQuery<HolderCountRecord[]>()

  const holderCountRecords = useMemo(() => {
    if (!holderCountRecordsRaw) return []

    // 获取所有唯一的时间戳
    const timestamps = [...new Set<number>(
      holderCountRecordsRaw.map((record: HolderCountRecord) => record.status.timestamp)
    )].sort((a, b) => a - b)
    
    // 为每个时间戳创建一个数据点
    return timestamps.map((timestamp: number) => {
      // 获取该时间戳的所有记录
      const dayRecords = holderCountRecordsRaw.filter(
        (record: HolderCountRecord) => record.status.timestamp === timestamp
      )
      
      // 分别获取不同链的持有者数量
      const ckb = dayRecords.find(
        (record: HolderCountRecord) => record.network === 'ckb'
      )?.count || 0
      const btc = dayRecords.find(
        (record: HolderCountRecord) => record.network === 'btc'
      )?.count || 0
      const doge = dayRecords.find(
        (record: HolderCountRecord) => record.network === 'doge'
      )?.count || 0
      
      return {
        timestamp,
        ckb,
        btc,
        doge,
        total: ckb + btc + doge
      }
    })
  }, [holderCountRecordsRaw])

  return {
    data:holderCountRecords,
    isLoading: !holderCountRecordsRaw
  }
}