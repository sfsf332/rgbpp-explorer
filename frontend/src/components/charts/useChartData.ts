import { useCharts } from '@/components/charts/useCharts'

// A factory function for chart data fetching
export function useChartData(chartId: string) {
  const { charts } = useCharts()
  const chart = charts.find(c => c.id === chartId)
  
  if (!chart) {
    return { data: null, isLoading: false }
  }

  return chart.useData()
}
