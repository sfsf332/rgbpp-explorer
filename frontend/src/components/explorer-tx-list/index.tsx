import { ExplorerTxListUI } from '@/components/explorer-tx-list/ui'
import { RgbppTransaction } from '@/types/graphql'

export function ExplorerTxList<
  T extends Omit<Pick<RgbppTransaction, 'ckbTransaction' | 'timestamp' | 'network' | 'txHash'>, 'btc' | 'direction'> & {
    btc?: { txid: string | null };
    direction?: 'on' | 'off' | 'within' | null;
  }
>(props: { transactions: T[]; type: string }) {
  return <ExplorerTxListUI txs={props.transactions} type={props.type} />
}