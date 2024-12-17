'use client'

import { Trans } from '@lingui/macro'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Box, HStack, styled, VStack } from 'styled-system/jsx'

import DownloadIcon from '@/assets/download.svg'
import InfoIcon from '@/assets/info.svg'
import { AppTooltip } from '@/components/app-tooltip'
import { useChartData } from '@/components/charts/useChartData'
import { useCharts } from '@/components/charts/useCharts'
import { Text } from '@/components/ui'
import { downloadCSV } from '@/utils/download'

export default function ChartDetailPage() {
  const params = useParams()
  const { charts } = useCharts()
  const [loading, setLoading] = useState(true)

  const chartId = params.chartId as string
  const chart = charts.find((c) => c.id === chartId)
  const { data, isLoading } = useChartData(chartId)

  useEffect(() => {
    if (data && !isLoading) {
      setLoading(false)
    }
  }, [data, isLoading])

  if (!chart) {
    return notFound()
  }

  const handleDownload = () => {
    if (!data || !chart.prepareDownloadData) return

    const downloadData = chart.prepareDownloadData(data)
    downloadCSV(
      downloadData.filename,
      downloadData.headers,
      downloadData.rows
    )
  }

  return (
    <VStack w="100%" maxW="content" p={{ base: '20px', lg: '30px' }} gap={{ base: '20px', lg: '30px' }}>
      <VStack w="100%" alignItems={'start'} maxW="content" bg="bg.card" rounded="8px" p={{ base: '20px', xl: '30px' }} gap={{ base: '20px', lg: '20px' }}>
        <Text fontSize="sm" color="brand" mb={{ base: '-10px', lg: '-20px' }}><Trans>chart</Trans></Text>
        <HStack justify="space-between" w="100%">
          <HStack gap={{ base: '10px', md: '15px' }}>
            <Text fontSize={{ base: '16px', md: '20px' }} fontWeight="bold">{chart.title}</Text>
            <AppTooltip
              trigger={<InfoIcon w="14px" h="14px" />}
              content={chart.description}
            />
          </HStack>
          <styled.button
            px={{ base: '10px', lg: '15px' }}
            height="32px"
            rounded="5px"
            gap="5px"
            cursor="pointer"
            border="1px solid"
            borderColor="border.light"
            justifyContent="center"
            alignItems="center"
            _hover={{ bg: "RGB(255, 255, 255, 0.08)" }}
            onClick={handleDownload}
            disabled={loading}
            display={loading ? 'none' : 'flex'}
          >
            <DownloadIcon w="18px" h="18px" />
            <Text display={{ base: 'none', md: 'block' }} fontSize={{ base: '14px'}} whiteSpace={'nowrap'}>
              <Trans>Download Data</Trans>
            </Text>
          </styled.button>
        </HStack>
        <Box w="100%" h="590px" position="relative" zIndex={1}>
          {!loading && <chart.chartRender data={data} />}
        </Box>
      </VStack>

      {!loading && chart.statsRender ? <chart.statsRender data={data} /> : null}
    </VStack>
  )
}