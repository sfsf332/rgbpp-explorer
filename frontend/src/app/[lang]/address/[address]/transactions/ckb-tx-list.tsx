'use client'

import { useEffect, useRef, useState } from 'react'

import { CkbTransactionCardWithQueryInAddress } from '@/components/ckb/ckb-transaction-card-with-query-in-address'
import { Loading } from '@/components/loading'
import { useAddressTransactions } from '@/hooks/useRgbppData'

interface TransactionItem {
  txHash: string;
  // 添加其他可能需要的属性
}

export function CKBTxList({ address }: { address: string }) {
  const [page, setPage] = useState(1)
  const [allTransactions, setAllTransactions] = useState<TransactionItem[]>([])
  const { addressTransactions: data, isLoading } = useAddressTransactions(address, 1, 1)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // 调试信息
  useEffect(() => {
    console.log('Data changed:', {
      page,
      dataLength: data?.data?.length,
      allTransactionsLength: allTransactions.length,
      isLoading
    })
  }, [data, page, allTransactions.length, isLoading])

  useEffect(() => {
    if (data?.data) {
      setAllTransactions(prev => {
        const newTransactions = [...prev, ...data.data]
        console.log('Updating transactions:', {
          previousLength: prev.length,
          newDataLength: data.data.length,
          totalLength: newTransactions.length
        })
        return newTransactions
      })
    }
  }, [data?.data])

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const isIntersecting = entries[0].isIntersecting
  //       const hasMoreData = data?.data?.length === 3
  //       const shouldLoadMore = isIntersecting && !isLoading && hasMoreData
        
  //       console.log('Intersection check:', {
  //         isIntersecting,
  //         isLoading,
  //         hasMoreData,
  //         shouldLoadMore,
  //         currentPage: page,
  //         dataLength: data?.data?.length
  //       })
        
  //       if (shouldLoadMore) {
  //         console.log('Loading more data, current page:', page)
  //         setPage(prev => prev + 1)
  //       }
  //     },
  //     { 
  //       threshold: 0.1,
  //       rootMargin: '300px' // 增加提前加载的距离
  //     }
  //   )

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current)
  //   }

  //   observerRef.current = observer

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect()
  //     }
  //   }
  // }, [isLoading, data?.data?.length, page])

  if (isLoading && page === 1) {
    return <Loading my="80px" />
  }

  if (allTransactions.length === 0) {
    return null
  }

  return (
    <>
      {allTransactions.map((item: TransactionItem) => (
        <CkbTransactionCardWithQueryInAddress 
          address={address} 
          hash={item.txHash} 
          key={item.txHash} 
        />
      ))}
      <div 
        ref={loadMoreRef} 
        style={{ 
          height: '100px', // 增加高度
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px' // 添加间距
        }}
        onClick={() => {
          console.log('Loading more data, current page:', page)
          setPage(prev => prev + 1)
        }}
      >
        
        {isLoading ? <Loading my="20px" /> : 'loading more'}
      </div>
    </>
  )
}