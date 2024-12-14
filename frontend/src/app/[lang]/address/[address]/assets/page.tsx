import { notFound } from 'next/navigation'

import { BtcAssetsList } from '@/app/[lang]/address/[address]/assets/btc-assets-list'
import { CKBAssetsList } from '@/app/[lang]/address/[address]/assets/ckb-assets-list'
import { isValidBTCAddress } from '@/lib/btc/is-valid-btc-address'
import { isValidCkbAddress } from '@/lib/ckb/is-valid-ckb-address'

export const maxDuration = 30

export default async function Page({ params: { address } }: { params: { address: string; lang: string } }) {
  if (isValidBTCAddress(address)) {
    return <BtcAssetsList address={address} />
  }

  if (isValidCkbAddress(address)) {
    return <CKBAssetsList address={address} />
  }
  return notFound()
}