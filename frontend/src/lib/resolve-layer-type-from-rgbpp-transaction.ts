import { LeapDirection, RgbppTransaction } from '@/gql/graphql'

export function resolveLayerTypeFromRGBppTransaction(
  tx: Pick<RgbppTransaction, 'ckbTransaction' | 'btc' | 'leapDirection'>,
) {
  console.log(tx)
 
  switch (tx.leapDirection) {
    case LeapDirection.LeapOut:
      return 'l1-l2'
    case LeapDirection.LeapIn:
      return 'l2-l1'
    case LeapDirection.Within:
      return 'l1'
    default:
      if (tx.btc?.txid && !tx.leapDirection) return 'l1'
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
