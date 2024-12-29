'use client'

import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Grid, HStack, VStack } from 'styled-system/jsx'

import { CustomLegend, CustomTooltipWithTotal, xAxisFormater, yAxisTickFormater } from '@/components/charts/common'
import { CHART_LINE_COLORS, ChartPeriod, filterDataByPeriod } from '@/components/charts/constants'
import { PeriodSelector } from '@/components/charts/period-selector'
import { ChartProps, TransactionCountChartDataPoint } from '@/components/charts/types'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { Text } from '@/components/ui'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { formatNumber } from '@/lib/string/format-number'

export function DailyTransactionsCountChart({ preview = false, data = [] }: ChartProps) {

  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('ALL')
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
      <HStack justifyContent={'end'} w="100%" h="35px" mb={{ base: '0px', md: '-65px' }} display={preview ? 'none' : 'flex'}>
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      </HStack>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData}>
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
            label={!preview && isMd ? {
              value: t(i18n)`Count`,
              angle: -90,
              position: 'left',
              style: {
                fontSize: '14px',
                fill: CHART_LINE_COLORS.axisStroke,
                textAnchor: 'middle'
              },
              offset: -5
            } : undefined}
          />
          {!preview && <Legend
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
            content={<CustomTooltipWithTotal />}
            cursor={{
              fill: CHART_LINE_COLORS.cursorFill,
              stroke: CHART_LINE_COLORS.cursorFill,
              strokeWidth: 1,
            }}
          />}
          <Bar
            type="monotone"
            dataKey="ckb"
            stackId="1"
            fill={CHART_LINE_COLORS.purple}
            name={t(i18n)`CKB chain`}
            hide={hiddenLines.has('ckb')}
          />
          <Bar
            type="monotone"
            dataKey="btc"
            stackId="1"
            fill={CHART_LINE_COLORS.orange}
            name={t(i18n)`BTC chain`}
            hide={hiddenLines.has('btc')}
          />
          <Bar
            type="monotone"
            dataKey="doge"
            stackId="1"
            fill={CHART_LINE_COLORS.yellow}
            name={t(i18n)`DOGE chain`}
            hide={hiddenLines.has('doge')}
          />
          {!preview && <Brush
            dataKey='timestamp'
            tickFormatter={xAxisFormater}
            height={30}
            stroke={CHART_LINE_COLORS.axisStroke}
            fill={CHART_LINE_COLORS.brushFill}
            style={{ fontSize: 14 }}
          />}
        </BarChart>
      </ResponsiveContainer>
    </VStack>
  )
}


export function DailyTransactionsCountStats({ data = [] as TransactionCountChartDataPoint[] }) {

  if (!data) return null

  const averageStats = {
    total: Math.round(data.reduce((sum, item) => sum + item.total, 0) / (data.length || 1)),
    ckb: Math.round(data.reduce((sum, item) => sum + item.ckb, 0) / (data.length || 1)),
    btc: Math.round(data.reduce((sum, item) => sum + item.btc, 0) / (data.length || 1)),
    doge: Math.round(data.reduce((sum, item) => sum + item.doge, 0) / (data.length || 1)),
  }

  const latest = data[data.length - 1]

  if (!latest) return null

  return (
    <VStack w="100%" alignItems={'start'} bg="bg.card" rounded="8px" p={{ base: '20px', lg: '30px' }} gap={{ base: '20px', lg: '30px' }}>
      <HStack>
        <Text fontSize={{ base: '16px', md: '20px' }} fontWeight="bold">
          <Trans>Daily Average</Trans>
        </Text>
      </HStack>
      <Grid w="100%" gridTemplateColumns={{ base: '1fr', lg: '1fr 3fr' }} gap={{ base: '20px', md: '30px' }}>
        <OverviewInfo>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>Daily RGB++ Transactions</Trans>
            </Text>
          }
            formatNumber
          >
            <Text color='text.link' fontWeight={600}>{formatNumber(averageStats.total)}</Text>
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>BTC Chain Transactions</Trans>
            </Text>
          } formatNumber>
            <Text color='text.primary' fontWeight={600}>{formatNumber(averageStats.btc)}</Text>
          </OverviewInfoItem>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>CKB Chain Transactions</Trans>
            </Text>
          } formatNumber>
            <Text color='text.primary' fontWeight={600}>{formatNumber(averageStats.ckb)}</Text>
          </OverviewInfoItem>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" fontWeight={500} lineHeight="24px" whiteSpace="nowrap">
              <Trans>DOGE Chain Transactions</Trans>
            </Text>
          } formatNumber>
            <Text color='text.primary' fontWeight={600}>{formatNumber(averageStats.doge)}</Text>
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>

    </VStack>
  )
}
