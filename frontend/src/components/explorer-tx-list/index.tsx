import { ExplorerTxListUI } from '@/components/explorer-tx-list/ui'
import { RgbppTransaction } from '@/gql/graphql'

export function ExplorerTxList<
  T extends Pick<RgbppTransaction, 'ckbTransaction' | 'timestamp' | 'btc' | 'leapDirection' | 'ckbTxHash'>,
>({ txs, txid ,type }: { txs: T[]; txid: (tx: T) => string; type: string }) {
  return <ExplorerTxListUI txs={txs.map((tx) => ({ ...tx, txid: txid(tx) ?? '', type }))} type={type} />
}