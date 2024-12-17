import { useMemo } from 'react'

import { trpc } from '@/configs/trpc'

interface IssueCountRecord {
  status: {
    timestamp: number;
  };
  count: number;
  assetType: 'xudt' | 'dob';
}

export function useRgbppIssueCountRecords() {
  const { data: issueCountRecordsRaw } = trpc.rgbpp.issueCountRecords.useQuery<IssueCountRecord[]>()

  const issueCountRecords = useMemo(() => {
    if (!issueCountRecordsRaw) return []

    // 获取所有唯一的时间戳
    const timestamps = [...new Set<number>(
      issueCountRecordsRaw.map((record: IssueCountRecord) => record.status.timestamp)
    )].sort((a, b) => a - b)
    
    // 为每个时间戳创建一个数据点
    return timestamps.map((timestamp: number) => {
      // 获取该时间戳的所有记录
      const dayRecords = issueCountRecordsRaw.filter(
        (record: IssueCountRecord) => record.status.timestamp === timestamp
      )
      
      // 分别获取 xudt 和 dob 的数量
      const xudt = dayRecords.find(
        (record: IssueCountRecord) => record.assetType === 'xudt'
      )?.count || 0
      const dob = dayRecords.find(
        (record: IssueCountRecord) => record.assetType === 'dob'
      )?.count || 0
      
      return {
        timestamp: timestamp * 1000,
        xudt,
        dob,
        total: xudt + dob
      }
    })
  }, [issueCountRecordsRaw])

  return {
    data:issueCountRecords,
    isLoading: !issueCountRecordsRaw
  }
}