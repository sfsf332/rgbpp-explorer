'use client'

import { i18n } from '@lingui/core'
import { notFound } from 'next/navigation'

import { BtcTransactionOverview } from '@/components/btc/btc-transaction-overview'
import { CkbTransactionOverview } from '@/components/ckb/ckb-transaction-overview'
import { BitcoinTransaction, CkbTransaction } from '@/gql/graphql'
import { useBtcTxs, useCkbTxDetail } from '@/hooks/useRgbppData'

// export const revalidate = 10
// export const dynamic = 'force-static'

export default function Page({ params: { tx, lang } }: { params: { tx: string; lang: string } }) {
  const isCkbTransaction = tx.startsWith('0x')
  console.log(isCkbTransaction)
  const btcData = useBtcTxs(tx)
  const ckbData = useCkbTxDetail(tx)
  const { data, isLoading } = isCkbTransaction ? ckbData : btcData
  console.log(data, isLoading)
  if (data && !isCkbTransaction) {
    return <BtcTransactionOverview
      btcTransaction={data as unknown as BitcoinTransaction}
      i18n={i18n}
    />
  }
  return <CkbTransactionOverview
    ckbTransaction={data as unknown as CkbTransaction}
    i18n={i18n}
  />

  notFound()
}
