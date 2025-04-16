'use client'

import { Trans } from '@lingui/macro'

import BtcIcon from '@/assets/chains/btc.svg'
import { Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { resolveBtcExplorerUrl } from '@/lib/btc/resolve-btc-explorer-url'

export function ViewBtcExplorer({ txid }: { txid: string }) {
  return (
    <Link
      href={resolveBtcExplorerUrl(txid, 'transaction')}
      target="_blank"
      display="flex"
      alignItems="center"
      justifyContent="start"
      gap="8px"
      py="8px"
      px="16px"
      rounded="4px"
      bg="bg.primary"
      w="fit-content"
    >
      <BtcIcon h="18px" w="18px" />
      <Text fontSize="14px" fontWeight="semibold">
        <Trans>View Details in BTC</Trans>
      </Text>
    </Link>
  )
} 