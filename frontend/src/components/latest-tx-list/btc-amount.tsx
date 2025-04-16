'use client'

import { Text } from '@/components/ui'
import { formatNumber } from '@/lib/string/format-number'

export function BtcAmount({ value }: { value: number }) {
  return (
    <>
      <b>{formatNumber(value)}</b>
      <Text as="span" color="text.third" fontSize="14px" fontWeight="medium" ml="4px">
        BTC
      </Text>
    </>
  )
} 