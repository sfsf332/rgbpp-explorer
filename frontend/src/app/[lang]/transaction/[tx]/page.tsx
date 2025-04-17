'use client'

import { i18n } from '@lingui/core'
import { notFound } from 'next/navigation'

import { BtcTransactionOverview } from '@/components/btc/btc-transaction-overview'
import { CkbTransactionOverview } from '@/components/ckb/ckb-transaction-overview'
import { BitcoinTransaction, CkbTransaction } from '@/gql/graphql'
import { useBtcTxs, useCkbTxDetail } from '@/hooks/useRgbppData'

// export const revalidate = 10
// export const dynamic = 'force-static'

function BtcTransactionPage({ tx }: { tx: string }) {
  const { data, isLoading } = useBtcTxs(tx)
  return <BtcTransactionOverview
    btcTransaction={data as unknown as BitcoinTransaction}
    i18n={i18n}
  />
}

function CkbTransactionPage({ tx }: { tx: string }) {
  const { data, isLoading } = useCkbTxDetail(tx)
  console.log(data)
  return <CkbTransactionOverview
    ckbTransaction={data as unknown as CkbTransaction}
    i18n={i18n}
  />
}

export default function Page({ params: { tx, lang } }: { params: { tx: string; lang: string } }) {
  const isCkbTransaction = tx.startsWith('0x')
  
  if (!isCkbTransaction) {
    return <BtcTransactionPage tx={tx} />
  } else {
    return <CkbTransactionPage tx={tx} />
  }
  notFound()
}
