'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Box } from 'styled-system/jsx'

import { ChartProps } from '@/app/[lang]/charts/types'

const mockData = [
  { time: '6', all: 10000, ft: 5000, dob: 5000 },
  { time: '7', all: 15000, ft: 8000, dob: 7000 },
  { time: '15', all: 50000, ft: 25000, dob: 25000 },
]

export function AssetsOverviewChart({ preview = false, data = mockData }: ChartProps) {
  return (
    <Box w="100%" h="100%">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          {!preview && <Tooltip />}
          <Line type="monotone" dataKey="all" stroke="#8884d8" />
          <Line type="monotone" dataKey="ft" stroke="#82ca9d" />
          <Line type="monotone" dataKey="dob" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export const assetsOverviewChart = {
  id: 'assets-overview',
  title: 'RGB++ Assets Overview',
  description: 'Overview of all RGB++ assets, including total count, holders and transactions',
  Component: AssetsOverviewChart,
  fetchData: async () => mockData,
}
