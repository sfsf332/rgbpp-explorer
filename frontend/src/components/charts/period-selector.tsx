import { HStack } from 'styled-system/jsx'

import { CHART_TIME_PERIODS, ChartPeriod } from '@/components/charts/constants'
import { Text } from '@/components/ui'

interface PeriodSelectorProps {
  selectedPeriod: ChartPeriod
  onChange: (period: ChartPeriod) => void
}

export function PeriodSelector({ selectedPeriod, onChange }: PeriodSelectorProps) {
  return (
    <HStack bg="bg.card.hover" borderRadius="5px" p="4px" fontSize="sm" zIndex="10">
      {Object.keys(CHART_TIME_PERIODS).map((period) => (
        <Text
          key={period}
          px="15px"
          py="5px"
          cursor="pointer"
          color={selectedPeriod === period ? 'text.primary' : 'text.third'}
          fontWeight={selectedPeriod === period ? 'bold' : 'normal'}
          bg={selectedPeriod === period ? 'bg.card' : 'transparent'}
          borderRadius="4px"
          _hover={{ color: 'text.primary', fontWeight: 'bold', bg: 'bg.card' }}
          onClick={() => onChange(period as ChartPeriod)}
        >
          {period}
        </Text>
      ))}
    </HStack>
  )
}
