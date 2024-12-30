import dayjs from 'dayjs'

export const CHART_TIME_PERIODS = {
  '7D': 7,
  '1M': 30,
  '6M': 180,
  '1Y': 365,
  'ALL': 9999,
} as const

export const CHART_LINE_COLORS = {
  blue: '#319CFF',
  orange: '#FF8744',
  purple: '#965BF4',
  yellow: '#FFE355',

  axisStroke: '#4C546D',
  gridStroke: '#282A42',
  brushFill: '#2A2C44',
  cursorFill: '#181A29',

  ckb: '#04CD9C',
  btc: '#F7931A', 
  doge: '#BA9F32',
  total: '#319CFF',
} as const

export type ChartPeriod = keyof typeof CHART_TIME_PERIODS

export function filterDataByPeriod<T extends { timestamp: number }>(
  data: T[],
  period: ChartPeriod
): T[] {
  if (period === 'ALL') return data
  
  const days = CHART_TIME_PERIODS[period]
  const cutoffDate = dayjs().subtract(days, 'day').valueOf()
  
  return data.filter(item => item.timestamp >= cutoffDate)
}
