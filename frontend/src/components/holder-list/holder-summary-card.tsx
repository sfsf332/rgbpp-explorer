'use client'

import { Box, HStack, VStack } from 'styled-system/jsx'

import { Text } from '@/components/ui'
import { formatNumber } from '@/lib/string/format-number'

export interface HolderSummaryCardProps {
  label: React.ReactNode
  value: number
  icon?: React.ReactNode
  isTotalHolders?: boolean
}

export function HolderSummaryCard({ label, value, icon, isTotalHolders }: HolderSummaryCardProps) {
  return (
    <Box w="100%" bg="bg.card" rounded="8px" p="24px">
      <HStack gap="16px" alignItems="center">
        {icon}
        <VStack alignItems="start" gap="4px">
          <Text color="text.third">{label}</Text>
          <Text fontSize="24px" fontWeight="500">
            {formatNumber(value)}
          </Text>
        </VStack>
      </HStack>
    </Box>
  )
} 