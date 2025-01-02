'use client'

import { Trans } from '@lingui/macro'
import { useQuery } from '@tanstack/react-query'

import { Text } from '@/components/ui'
import { formatNumber } from '@/lib/string/format-number'
import { apiFetcher,  } from '@/services/fecthcer'

interface AmountProps {
  ckbTxHash: string;
}

export function Amount({ ckbTxHash }: AmountProps) {
  if (!ckbTxHash) return <Trans>-</Trans>
  const ckbTransaction = apiFetcher.fetchRGBTransaction(ckbTxHash)
  console.log(ckbTransaction)
  const { isLoading, data, error } = useQuery({
      queryKey: [ckbTxHash],
      async queryFn() {
      //  return graphQLClient.request(query, { limit  : 10 })
      const res = await apiFetcher.fetchRGBTransaction(ckbTxHash)
      return res?.data
      },
      refetchInterval: 10000,
    })
    console.log(data)
  // const dobOutputCount = ckbTransaction?.outputs.filter(
  //   (output) => output.cellType === CellType.Dob || output.cellType === CellType.Mnft,
  // )
  // if (dobOutputCount?.length) {
  //   return (
  //     <Trans>
  //       <b>{dobOutputCount.length}</b>
  //       <Text as="span" color="text.third" fontSize="14px" fontWeight="medium" ml="4px">
  //         DOB
  //       </Text>
  //     </Trans>
  //   )
  // }

  // const cellDiff = ckbTransaction.outputs.find((x) => x.xudtInfo)

  // if (!cellDiff) {
  //   return <Trans>-</Trans>
  // }

  return (
    <>
      {/* <b>{formatNumber(cellDiff.xudtInfo?.amount, cellDiff.xudtInfo?.decimal)}</b>
      <Text as="span" color="text.third" fontSize="14px" fontWeight="medium" ml="4px">
        {cellDiff.xudtInfo?.symbol}
      </Text> */}
    </>
  )
}
