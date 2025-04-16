import { RgbppTransaction } from '@/gql/graphql'
import { resolveLayerTypeFromRGBppTransaction } from '@/lib/resolve-layer-type-from-rgbpp-transaction'

export function resolveRGBppTxHash(tx: Pick<RgbppTransaction, 'btc' | 'ckbTxHash' | 'leapDirection'>) {
  const type = resolveLayerTypeFromRGBppTransaction(tx)
  if (!type) return tx.ckbTxHash
  switch (type) {
    case 'l1-l2':
    case 'l1':
      return tx.btc?.txid ?? tx.ckbTxHash
    case 'l2':
    case 'l2-l1':
      return tx.ckbTxHash ?? tx.btc?.txid
  }
}
