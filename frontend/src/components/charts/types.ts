import { ComponentType } from 'react'

export interface ChartProps {
  preview?: boolean 
  data?: any
}

export interface ChartComponent {
  chartRender: ComponentType<ChartProps>
  statsRender?: ComponentType<ChartProps>
}

export interface ChartDownloadData {
  filename: string
  headers: string[]
  rows: any[][]
}

export interface ChartDefinition extends ChartComponent {
  id: string
  title: string
  category: 'overview' | 'utilization'
  description: string
  useData: () => { data: any; isLoading: boolean }
  prepareDownloadData?: (data: any) => ChartDownloadData
}

export interface ChartCategory {
  id: 'overview' | 'utilization'
  title: string
  charts: ChartDefinition[]
}

export interface IssueCountChartDataPoint {
  timestamp: number;
  xudt: number;
  dob: number;
  total: number;
}

export interface HoldersCountChartDataPoint {
  timestamp: number;
  ckb: number;
  btc: number;
  doge: number;
  total: number;
}

export interface TransactionCountChartDataPoint {
  timestamp: number;
  ckb: number;
  btc: number;
  doge: number;
  unknown: number;
  total: number;
}