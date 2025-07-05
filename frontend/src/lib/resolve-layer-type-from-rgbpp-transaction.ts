// import { RgbppTransaction } from '@/types/graphql'
// import { CkbTransaction } from '@/types/graphql'

export function resolveLayerTypeFromRGBppTransaction<
  T extends {
    btc?: { txid: string | null };
    direction?: 'on' | 'off' | 'within' | null;
    ckbTransaction: any;
  }
>(tx: T) {
  console.log(tx)
 
  switch (tx.direction) {
    case 'on':
      return 'l1-l2'
    case 'off':
      return 'l2-l1'
    case 'within':
      return 'l1'
    default:
      if (tx.btc?.txid && !tx.direction) return 'l1'
      return 'l2'
  }
}

export function resolveLayerTypeFromRGBppTransactionNew(
 txType: string,
) {
  switch (txType) {
    case 'in':
      return 'l2'
    case 'out':
      return 'l2-l1'
    case 'withinBTC':
      return 'l1'
    default:
      return 'l2'
  }
}
