import { ComponentType } from 'react'

export interface ChartProps {
  preview?: boolean 
  data?: any
}

export interface ChartComponent {
  Component: ComponentType<ChartProps>
}

export interface ChartDefinition extends ChartComponent {
  id: string
  title: string
  category: 'overview' | 'utilization'
  description: string
  fetchData?: () => Promise<any>
}

export interface ChartCategory {
  id: 'overview' | 'utilization'
  title: string
  charts: ChartDefinition[]
}
