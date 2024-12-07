import { assetsOverviewChart } from '@/app/[lang]/charts/charts/AssetsOverview'
import { ChartCategory, ChartDefinition } from '@/app/[lang]/charts/types'

// charts, todo
const charts: ChartDefinition[] = [
  {
    ...assetsOverviewChart,
    category: 'overview',
  },
  {
    id: 'holders-overview',
    title: 'Total Holders of RGB++ Asset',
    description: 'The number of unique addresses that hold at least one RGB++ asset',
    category: 'overview',
    Component: assetsOverviewChart.Component, 
    fetchData: assetsOverviewChart.fetchData,
  },
  {
    id: 'transactions-overview',
    title: 'Total RGB++ Assets Transactions',
    description: 'The number of transactions related to RGB++ assets',
    category: 'overview',
    Component: assetsOverviewChart.Component,
    fetchData: assetsOverviewChart.fetchData,
  },
  {
    id: 'occupied-ckb',
    title: 'Total Occupied CKB',
    description: 'The total amount of CKB occupied by RGB++ assets',  
    category: 'utilization',
    Component: assetsOverviewChart.Component,
    fetchData: assetsOverviewChart.fetchData,
  },
]

export const chartCategories: ChartCategory[] = [
  {
    id: 'overview',
    title: 'RGB++ Assets Overview & Activity',
    charts: charts.filter(chart => chart.category === 'overview'),
  },
  {
    id: 'utilization',
    title: 'RGB++ Assets Utilization',
    charts: charts.filter(chart => chart.category === 'utilization'),
  },
]

export function getChartById(id: string): ChartDefinition | undefined {
  return charts.find(chart => chart.id === id)
}
