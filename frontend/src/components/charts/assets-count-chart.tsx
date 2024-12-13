'use client'

import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Box, Grid, HStack, VStack } from 'styled-system/jsx'

import { CHART_LINE_COLORS, ChartPeriod, filterDataByPeriod } from '@/components/charts/constants'
import { PeriodSelector } from '@/components/charts/period-selector'
import { ChartProps, IssueCountChartDataPoint } from '@/components/charts/types'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { Text } from '@/components/ui'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { formatNumber } from '@/lib/string/format-number'

const xAxisFormater = (timestamp: number) => {
  return dayjs(timestamp).format('MM/DD');
};

const yAxisTickFormater = (value: number) => {
  return `${formatNumber(value)}`;
};

interface CustomLegendProps {
  payload?: Array<{
    value: string
    color: string
    dataKey: string
  }>
  onToggle: (dataKey: string) => void
  hiddenLines: Set<string>
}

function CustomLegend({ payload, onToggle, hiddenLines }: CustomLegendProps) {
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

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null;
  }

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

      {payload.map((item: any, index: number) => (
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
  );
}


export function AssetsCountChart({ preview = false, data = [] }: ChartProps) {

  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('1M')
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set())
  const isMd = useBreakpoints('md')
  const { i18n } = useLingui()

  const toggleLine = (dataKey: string) => {
    const newHiddenLines = new Set(hiddenLines)
    if (newHiddenLines.has(dataKey)) {
      newHiddenLines.delete(dataKey)
    } else {
      newHiddenLines.add(dataKey)
    }
    setHiddenLines(newHiddenLines)
  }

  if (!data) {
    return <VStack w="100%" h="100%" gap="20px" />
  }

  const filteredData = filterDataByPeriod(data, selectedPeriod)

  return (
    <VStack w="100%" h="100%" gap="20px">
      <HStack justifyContent={'end'} w="100%" h="35px" mb={{ base: '0px', md: '-65px'}} display={preview ? 'none' : 'flex'}>
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      </HStack>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_LINE_COLORS.gridStroke} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={xAxisFormater}
            minTickGap={20}
            stroke={CHART_LINE_COLORS.axisStroke}
            interval="preserveStartEnd"
            tick={{ fontSize: 14 }}
          />
          <YAxis
            stroke={CHART_LINE_COLORS.axisStroke}
            interval="preserveStartEnd"
            domain={['dataMin', 'dataMax']}
            tickFormatter={yAxisTickFormater}
            tick={{ fontSize: 14 }}
          />
          {!preview &&<Legend 
            wrapperStyle={{
              display: 'flex', 
              justifyContent: isMd ? 'left' : 'center', 
              alignItems: 'center',
              marginTop: isMd ? '-10px' : '0px',
            }}
            verticalAlign={isMd ? 'top' : 'bottom'}
            align="left"
            content={<CustomLegend payload={undefined} onToggle={toggleLine} hiddenLines={hiddenLines} />}
          />}
          {!preview && <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ 
              stroke: CHART_LINE_COLORS.axisStroke,
              strokeWidth: 1,
            }} 
          />}
          <Line 
            type="monotone" 
            dot={false} 
            dataKey="total"
            stroke={CHART_LINE_COLORS.blue} 
            name={t(i18n)`Total`} 
            hide={hiddenLines.has('total')}
          />
          <Line 
            type="monotone" 
            dot={false} 
            dataKey="xudt" 
            stroke={CHART_LINE_COLORS.purple} 
            name={t(i18n)`Coins`} 
            hide={hiddenLines.has('xudt')}
          />
          <Line 
            type="monotone" 
            dot={false} 
            dataKey="dob" 
            stroke={CHART_LINE_COLORS.orange} 
            name={t(i18n)`DOB Collections`} 
            hide={hiddenLines.has('dob')}
          />
          {!preview && <Brush
            dataKey='timestamp'
            tickFormatter={xAxisFormater}
            height={30}
            stroke={CHART_LINE_COLORS.axisStroke}
            fill={CHART_LINE_COLORS.brushFill}
            style={{ fontSize: 14 }}
          />}
        </LineChart>
      </ResponsiveContainer>
    </VStack>
  )
}


export function AssetsCountStats({ data = [] as IssueCountChartDataPoint[]}) {

  if (!data) return null

  const latest = data[data.length - 1]

  if (!latest) return null
  console.log(latest)
  return (
    <VStack w="100%" alignItems={'start'} bg="bg.card" rounded="8px" p={{ base: '20px', lg: '30px' }} gap={{ base: '20px', lg: '30px' }}>
      <Text fontSize={{ base: '16px', md: '20px' }} fontWeight="bold">Statistic</Text>
      <Grid w="100%" gridTemplateColumns={{ base: '1fr', lg: '1fr 3fr' }} gap={{ base: '20px', md: '30px' }}>
        <OverviewInfo>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>Total RGB++ Assets</Trans>
            </Text>
          } formatNumber>
            <Text color='text.link' fontWeight={600}>{latest.total}</Text>
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>Coins</Trans>
            </Text>
          } formatNumber>
            <Text color='text.primary' fontWeight={600}>{latest.xudt}</Text>
          </OverviewInfoItem>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>DOB Collections</Trans>
            </Text>
          } formatNumber>
            <Text color='text.primary' fontWeight={600}>{latest.dob}</Text>
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>

    </VStack>
  )
}
