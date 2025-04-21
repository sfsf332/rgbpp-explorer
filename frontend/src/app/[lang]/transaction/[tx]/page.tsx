'use client'

// import { notFound } from 'next/navigation'

import { BtcTransactionOverview } from '@/components/btc/btc-transaction-overview'
import { BtcUtxos } from '@/components/btc/btc-utxos'
import { CkbCells } from '@/components/ckb/ckb-cells'
import { CkbTransactionOverview } from '@/components/ckb/ckb-transaction-overview'
import { Loading } from '@/components/loading'
import { TransactionHeader } from '@/components/transaction-header'
import { useBtcTxs, useCkbTxDetail } from '@/hooks/useRgbppData'
import { resolveLayerTypeFromRGBppTransaction } from '@/lib/resolve-layer-type-from-rgbpp-transaction'
import {CkbTransaction } from '@/types/graphql'

function BtcTransactionPage({ tx }: { tx: string }) {
  const { data:btcTransaction, isLoading } = useBtcTxs(tx)
  if (isLoading || !btcTransaction) return <Loading my="80px" />
  console.log(btcTransaction)

  
  return (
    <>
      {/* todo: remove confirmations */}
      <TransactionHeader
        type={resolveLayerTypeFromRGBppTransaction({
          ckbTransaction: undefined,
          btc: btcTransaction,
          direction: undefined,
        })}
        txid={btcTransaction.txid}
        // confirmations={data.confirmed ? 1 : 0}
      />
      <BtcTransactionOverview btcTransaction={btcTransaction} />
      <BtcUtxos
        txid={btcTransaction.txid}
        vin={btcTransaction.vin}
        vout={btcTransaction.vout}
      />
    </>
  )
}

function CkbTransactionPage({ tx }: { tx: string }) {
  const { data, isLoading } = useCkbTxDetail(tx)
  if (isLoading || !data) return <Loading my="80px" />

  const hash = data.hash

  return (
    <>
      {/* todo: remove confirmations */}
      <TransactionHeader
        type={resolveLayerTypeFromRGBppTransaction({
          ckbTransaction: data as unknown as CkbTransaction,
          btc: undefined,
          direction: undefined,
        })}
        txid={hash}
      />

      <CkbTransactionOverview ckbTransaction={data as unknown as CkbTransaction} />
      <CkbCells ckbTransaction={data as unknown as CkbTransaction} />
    </>
  )
}

export default function Page({ params: { tx } }: { params: { tx: string } }) {
 
  if (tx.startsWith('0x')) {
    return <CkbTransactionPage tx={tx} />
  }
  return <BtcTransactionPage tx={tx} />
}
