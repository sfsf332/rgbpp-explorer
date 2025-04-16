'use client'

import { Trans } from '@lingui/macro'
import { Box, HStack, VStack } from 'styled-system/jsx'

import BtcIcon from '@/assets/chains/btc.svg'
import CkbIcon from '@/assets/chains/ckb.svg'
import { HolderSummaryCard } from '@/components/holder-list/holder-summary-card'
import { HolderSummary } from '@/components/holder-list/type'

export function HolderSummaryUI({ summary }: { summary: HolderSummary }) {
  return (
    <Box w="100%" bg="bg.card" rounded="8px" p="24px">
      <HStack gap="24px" flexWrap="wrap">
        <HolderSummaryCard
          label={<Trans>Total Holders</Trans>}
          value={summary.totalHolders}
          isTotalHolders
        />
        <HolderSummaryCard
          label={<Trans>BTC Holders</Trans>}
          value={summary.chainHolders.btc}
          icon={<BtcIcon w="18px" h="18px" />}
        />
        <HolderSummaryCard
          label={<Trans>CKB Holders</Trans>}
          value={summary.chainHolders.ckb}
          icon={<CkbIcon w="18px" h="18px" />}
        />
      </HStack>
    </Box>
  )
}

export function HolderSummarySection({ summary }: { summary: HolderSummary }) {
  return (
    <VStack w="100%" gap="24px">
      <HolderSummaryUI summary={summary} />
    </VStack>
  )
}