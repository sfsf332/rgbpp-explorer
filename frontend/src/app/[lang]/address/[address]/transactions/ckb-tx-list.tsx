'use client'

// import { CkbTransactionCardWithQueryInAddress } from '@/components/ckb/ckb-transaction-card-with-query-in-address'
import { Loading } from '@/components/loading'
import { useBtcAddressTransactions } from '@/hooks/useRgbppData'

interface TransactionItem {
  txHash: string;
  // 添加其他可能需要的属性
}

export function CKBTxList({ address }: { address: string }) {
  const { addressTransactions: data, isLoading } = useBtcAddressTransactions(address)
  console.log(data)
  // const { data, isLoading, ...query } = useInfiniteQuery({
  //   queryKey: [QueryKey.CkbTransactionCardInAddressList, address],
  //   async queryFn({ pageParam }) {
  //     const { ckbAddress } = await graphQLClient.request(ckbAddressTxsQuery, {
  //       address,
  //       page: pageParam,
  //       pageSize: 10,
  //     })
  //     return ckbAddress
  //   },
  //   select(data) {
  //     return compact(data.pages.flatMap((page) => page?.transactions))
  //   },
  //   getNextPageParam(lastPage, _, pageParam) {
  //     if (lastPage?.transactionsCount && pageParam * 10 >= lastPage?.transactionsCount) return
  //     return pageParam + 1
  //   },
  //   initialData: undefined,
  //   initialPageParam: 1,
  // })

  // if (isLoading) {
  //   return <Loading my="80px" />
  // }

  // if (!query.hasNextPage && !data?.length) {
  //   return (
  //     <Center w="100%" bg="bg.card" pt="80px" pb="120px" rounded="8px">
  //       <NoData>
  //         <Trans>No Transaction</Trans>
  //       </NoData>
  //     </Center>
  //   )
  // }

  return (
    <>
    {isLoading ? <Loading my="80px" /> : (
      data?.data.map((item: TransactionItem) => (
        <div key={item.txHash}>
        {item.txHash}
        </div>
        // <CkbTransactionCardWithQueryInAddress 
        //   address={address} 
        //   hash={item.txHash} 
        //   key={item.txHash} 
        // />
      ))
    )}
    </>
  )
}
