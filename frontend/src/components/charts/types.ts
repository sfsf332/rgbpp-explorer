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
  fetchData: () => Promise<any>
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