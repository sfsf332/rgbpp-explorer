import { useCharts } from '@/components/charts/useCharts'

// A factory function for chart data fetching
export function useChartData(chartId: string) {
  const { getChartById } = useCharts()
  const chart = getChartById(chartId)

  if (!chart) {
    return { data: null, isLoading: false }
  }

  return chart.useData()
}
