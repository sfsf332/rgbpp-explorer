'use client'

import { Trans } from '@lingui/macro'

import { Text } from '@/components/ui'
import { formatNumber } from '@/lib/string/format-number'
import { CkbTransaction } from '@/types/graphql'

export function Amount({ transaction }: { transaction?: CkbTransaction | null }) {
  if (!transaction?.outputs) return <Trans>-</Trans>

  const outputs = transaction.outputs
  const capacity = outputs[0]?.capacity
  const cellType = outputs[0]?.cellType
  console.log(outputs)
  if (!capacity) {
    return <Trans>-</Trans>
  }
  console.log(cellType)
  return (
    <>
      <b>{formatNumber(capacity)}</b>
      <Text as="span" color="text.third" fontSize="14px" fontWeight="medium" ml="4px">
        {cellType}
      </Text>
    </>
  )
}