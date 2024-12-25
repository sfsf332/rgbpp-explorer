import { useMemo } from 'react'

import { trpc } from '@/configs/trpc'

interface TransactionCountRecord {
  status: {
    timestamp: number;
  };
  network: 'ckb' | 'btc' | 'doge' | 'unknown';
  count: number;
}

export function useDailyRgbppTxCountRecords() {
  const { data: transactionCountRecordsRaw } = trpc.rgbpp.transactionCountRecords.useQuery<TransactionCountRecord[]>()

  const dailyTxCountRecords = useMemo(() => {
    if (!transactionCountRecordsRaw) return []

    // get all unique timestamps
    const timestamps = [...new Set<number>(
      transactionCountRecordsRaw.map((record: TransactionCountRecord) => record.status.timestamp)
    )].sort((a, b) => a - b)
    
    // create a data point for each timestamp
    return timestamps.map((timestamp: number, index) => {
      // get all records for the timestamp
      const dayRecords = transactionCountRecordsRaw.filter(
        (record: TransactionCountRecord) => record.status.timestamp === timestamp
      )
      
      // get the counts of current day
      const currentCkb = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'ckb'
      )?.count || 0
      const currentBtc = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'btc'
      )?.count || 0
      const currentDoge = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'doge'
      )?.count || 0
      const currentUnknown = dayRecords.find(
        (record: TransactionCountRecord) => record.network === 'unknown'
      )?.count || 0

      // skip the first day
      if (index === 0) {
        return null
      }

      // get previous day records
      const prevDayRecords = transactionCountRecordsRaw.filter(
        (record: TransactionCountRecord) => record.status.timestamp === timestamps[index - 1]
      )

      // get the counts of previous day
      const prevCkb = prevDayRecords.find(
        (record: TransactionCountRecord) => record.network === 'ckb'
      )?.count || 0
      const prevBtc = prevDayRecords.find(
        (record: TransactionCountRecord) => record.network === 'btc'
      )?.count || 0
      const prevDoge = prevDayRecords.find(
        (record: TransactionCountRecord) => record.network === 'doge'
      )?.count || 0
      const prevUnknown = prevDayRecords.find(
        (record: TransactionCountRecord) => record.network === 'unknown'
      )?.count || 0

      // calculate daily differences
      const ckb = currentCkb - prevCkb
      const btc = currentBtc - prevBtc
      const doge = currentDoge - prevDoge
      const unknown = currentUnknown - prevUnknown
      const total = ckb + btc + doge + unknown
      
      return {
        timestamp,
        ckb,
        btc,
        doge,
        unknown,
        total
      }
    }).filter(record => record !== null)
  }, [transactionCountRecordsRaw])

  return {
    data: dailyTxCountRecords,
    isLoading: !transactionCountRecordsRaw
  }
}