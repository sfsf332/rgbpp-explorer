'use client'

// import { Trans } from '@lingui/macro'
// import { VStack } from 'styled-system/jsx'

// import { CkbCellTables } from '@/components/ckb/ckb-cell-tables'
// import { CkbTransactionInViewQuery } from '@/components/ckb/ckb-transaction-in-view-query'
// // import { TransactionHeaderInAddress } from '@/components/transaction-header-in-address'
// import { UtxoOrCellFooter } from '@/components/utxo-or-cell-footer'

export function CkbTransactionCardWithQueryInAddress({ hash, address }: { address: string; hash: string }) {
  return (
    <>todo</>
    // <CkbTransactionInViewQuery hash={hash}>
    //   {(data) => {
    //     return (
    //       <VStack w="100%" gap={0} bg="bg.card" rounded="8px">
    //         {/* <TransactionHeaderInAddress txid={data.hash} /> */}
    //         <CkbCellTables inputs={data.display_inputs} outputs={data.display_outputs} isCellbase={data.is_cellbase} address={address} />
    //         <UtxoOrCellFooter
    //           fee={data.fee}
    //           confirmations={data.confirmations}
    //           feeRate={data.feeRate}
    //           ckbCell={data}
    //           feeUnit={<Trans>shannons</Trans>}
    //           sizeUnit={<Trans>kB</Trans>}
    //           address={address}
    //         />
    //       </VStack>
    //     )
    //   }}
    // </CkbTransactionInViewQuery>
  )
}