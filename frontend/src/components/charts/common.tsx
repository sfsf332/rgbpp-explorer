import dayjs from 'dayjs'
import { Box, HStack, VStack } from 'styled-system/jsx'

import { Text } from '@/components/ui'
import { formatNumber } from '@/lib/string/format-number'

export const xAxisFormater = (timestamp: number) => {
  return dayjs(timestamp).format('MM/DD')
}

export const yAxisTickFormater = (value: number) => {
  return `${formatNumber(value)}`
}

export interface CustomLegendProps {
  payload?: Array<{
    value: string
    color: string
    dataKey: string
  }>
  onToggle: (dataKey: string) => void
  hiddenLines: Set<string>
}

export function CustomLegend({ payload, onToggle, hiddenLines }: CustomLegendProps) {
  return (
    <HStack gap="24px" justify="center" py="20px">
      {payload?.map((entry: any) => (
        <HStack 
          key={entry.value} 
          gap="8px" 
          cursor="pointer"
          opacity={hiddenLines.has(entry.dataKey) ? 0.5 : 1}
          onClick={() => onToggle(entry.dataKey)}
        >
          <Box
            w="20px"
            h="12px"
            borderRadius="2px"
            style={{ background: entry.color }}
          />
          <Text color="text.primary" fontSize="14px">
            {entry.value}
          </Text>
        </HStack>
      ))}
    </HStack>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: number
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }
  console.log(payload, label)
  return (
    <VStack
      bg="bg.tooltip"
      p="15px"
      minW="240px"
      borderRadius="8px"
      fontSize="14px"
      gap="15px"
      alignItems="start"
    >
      <Text color="text.third" fontSize="12px">
        {dayjs(label).format('YYYY-MM-DD')}
      </Text>

      {payload.map((item, index) => (
        <HStack 
          key={item.name}
          w="100%" 
          gap="20px" 
          mb={index === payload.length - 1 ? 0 : "-10px"} 
          justify={'space-between'}
        >
          <HStack gap="5px">
            <Box
              w="12px"
              h="12px"
              borderRadius="2px"
              style={{ background: item.color }}
            />
            <Text color="text.primary">{item.name}:</Text>
          </HStack>

          <Text color="text.primary">{formatNumber(item.value)}</Text>
        </HStack>
      ))}
    </VStack>
  )
}
