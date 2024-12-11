import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { assetsOverviewChart } from '@/components/charts/asset-overview-chart'
import { ChartCategory, ChartDefinition } from '@/components/charts/types'

// charts, todo
export function useCharts() {
  const { i18n } = useLingui()
  
  const charts: ChartDefinition[] = [
    {
      id: 'total-assets',
      title: t(i18n)`Total Count of RGB++ Asset `,
      description: t(i18n)`The total number of RGB++ assets`,
      category: 'overview',
      Component: assetsOverviewChart.Component, 
      fetchData: assetsOverviewChart.fetchData,
    },
    {
      id: 'total-holders',
      title: t(i18n)`Total Holders of RGB++ Asset`,
      description: t(i18n)`The number of unique addresses that hold at least one RGB++ asset`,
      category: 'overview',
      Component: assetsOverviewChart.Component, 
      fetchData: assetsOverviewChart.fetchData,
    },
    {
      id: 'total-transactions',
      title: t(i18n)`Total RGB++ Assets Transactions`,
      description: t(i18n)`The number of transactions related to RGB++ assets`,
      category: 'overview',
      Component: assetsOverviewChart.Component,
      fetchData: assetsOverviewChart.fetchData,
    },
    {
      id: 'occupied-ckb',
      title: t(i18n)`Total Occupied CKB`,
      description: t(i18n)`The total amount of CKB occupied by RGB++ assets`,  
      category: 'utilization',
      Component: assetsOverviewChart.Component,
      fetchData: assetsOverviewChart.fetchData,
    },
  ]

  const chartCategories: ChartCategory[] = [
    {
      id: 'overview',
      title: t(i18n)`RGB++ Assets Overview & Activity`,
      charts: charts.filter(chart => chart.category === 'overview'),
    },
    {
      id: 'utilization',
      title: t(i18n)`RGB++ Assets Utilization`,
      charts: charts.filter(chart => chart.category === 'utilization'),
    },
  ]

  const getChartById = (id: string) => charts.find(chart => chart.id === id)

  return { charts, chartCategories, getChartById }
}
