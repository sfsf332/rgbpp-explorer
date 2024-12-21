import { useMemo } from 'react'

import { trpc } from '@/configs/trpc'

interface TransactionCountRecord {
  status: {
    timestamp: number;
  };
  network: 'ckb' | 'btc' | 'doge' | 'unknown';
  count: number;
}

export function useRgbppTransactionCountRecords() {
  const { data: transactionCountRecordsRaw } = trpc.rgbpp.transactionCountRecords.useQuery<TransactionCountRecord[]>()

  const transactionCountRecords = useMemo(() => {
    if (!transactionCountRecordsRaw) return []

    // get all unique timestamps
    const timestamps = [...new Set<number>(
      transactionCountRecordsRaw.map((record: TransactionCountRecord) => record.status.timestamp)
    )].sort((a,   b) => a - b)
    
    // create a data point for each timestamp
    return timestamps.map((timestamp: number) => {
      // get all records for the timestamp
      const dayRecords = transactionCountRecordsRaw.filter(
        (record: TransactionCountRecord) => record.status.timestamp === timestamp
      )
      
      // get the counts of ckb and dob
      const ckb = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'ckb'
      )?.count || 0
      const btc = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'btc'
      )?.count || 0
      const doge = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'doge'
      )?.count || 0
      const unknown = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'unknown'
      )?.count || 0
      
      return {
        timestamp,
        ckb,
        btc,
        doge,
        unknown,
        total: ckb + btc + doge + unknown
      }
    })
  }, [transactionCountRecordsRaw])

  return {
    data:transactionCountRecords,
    isLoading: !transactionCountRecordsRaw
  }
}