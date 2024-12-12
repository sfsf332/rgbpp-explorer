import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import dayjs from 'dayjs'

import { AssetsCountChart, AssetsCountStats } from '@/components/charts/assets-count-chart'
import { ChartCategory, ChartDefinition } from '@/components/charts/types'
import { DATE_TEMPLATE } from '@/constants'
import { mockIssueCountRecords } from '@/mocks/issue-count-records'

// charts, todo
export function useCharts() {
  const { i18n } = useLingui()
  
  const charts: ChartDefinition[] = [
    {
      id: 'total-assets',
      title: t(i18n)`Total Count of RGB++ Asset `,
      description: t(i18n)`The total number of RGB++ assets, including FT and DOB`,
      category: 'overview',
      chartRender: AssetsCountChart, 
      statsRender: AssetsCountStats,
      fetchData: async () => {
        return mockIssueCountRecords
      },
      prepareDownloadData: (data) => {
        return {
          filename: 'rgbpp-assets-transactions',
          headers: ['Date', 'xUDT(FT)', 'DOB(NFT)', 'Total'],
          rows: data?.map(item => [
            dayjs(item.timestamp).format(DATE_TEMPLATE),
            item.xudt,
            item.dob,
            item.xudt + item.dob
          ])
        }
      },
    },
    {
      id: 'total-holders',
      title: t(i18n)`Total Holders of RGB++ Asset`,
      description: t(i18n)`The number of unique addresses that hold at least one RGB++ asset`,
      category: 'overview',
      chartRender: AssetsCountChart, 
      statsRender: AssetsCountStats,
      fetchData: async () => {
        return mockIssueCountRecords
      },
      prepareDownloadData: (data) => {
        return {
          filename: 'rgb-assets-transactions',
          headers: ['Time', 'All', 'FT', 'DOB'],
          rows: data.map(item => [
            item.time,
            item.all,
            item.ft,
            item.dob
          ])
        }
      },
    },
    {
      id: 'total-transactions',
      title: t(i18n)`Total RGB++ Assets Transactions`,
      description: t(i18n)`The number of transactions related to RGB++ assets`,
      category: 'overview',
      chartRender: AssetsCountChart, 
      statsRender: AssetsCountStats,
      fetchData: async () => {
        return mockIssueCountRecords
      },
      prepareDownloadData: (data) => {
        return {
          filename: 'rgb-assets-transactions',
          headers: ['Time', 'All', 'FT', 'DOB'],
          rows: data.map(item => [
            item.time,
            item.all,
            item.ft,
            item.dob
          ])
        }
      },
    },
    {
      id: 'occupied-ckb',
      title: t(i18n)`Total Occupied CKB`,
      description: t(i18n)`The total amount of CKB occupied by RGB++ assets`,  
      category: 'utilization',
      chartRender: AssetsCountChart, 
      statsRender: AssetsCountStats,
      fetchData: async () => {
        return mockIssueCountRecords
      },
      prepareDownloadData: (data) => {
        return {
          filename: 'rgb-assets-transactions',
          headers: ['Time', 'All', 'FT', 'DOB'],
          rows: data.map(item => [
            item.time,
            item.all,
            item.ft,
            item.dob
          ])
        }
      },
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
