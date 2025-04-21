'use client'

import { Trans } from '@lingui/macro'

import { Text } from '@/components/ui'
import { formatNumber } from '@/lib/string/format-number'
import { CkbTransaction } from '@/types/graphql'

export function Amount({ transaction }: { transaction?: CkbTransaction | null }) {
  if (!transaction?.display_outputs) return <Trans>-</Trans>

  const outputs = transaction.display_outputs
  const capacity = outputs[0]?.capacity

  if (!capacity) {
    return <Trans>-</Trans>
  }

  return (
    <>
      <b>{formatNumber(capacity)}</b>
      <Text as="span" color="text.third" fontSize="14px" fontWeight="medium" ml="4px">
        CKB
      </Text>
    </>
  )
}