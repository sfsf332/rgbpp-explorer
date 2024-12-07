'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Box, VStack } from 'styled-system/jsx'

import { getChartById } from '@/app/[lang]/charts/charts'
import { Text } from '@/components/ui'

export default function ChartDetailPage() {
  const params = useParams()
  const chartId = params.chartId as string
  const chart = getChartById(chartId)
  console.log(chartId);
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (chart?.fetchData) {
      chart.fetchData().then(setData)
    }
  }, [chart])

  if (!chart) {
    return (
      <VStack w="100%" maxW="1200px" mx="auto" py="40px" px={{ base: '20px', md: '30px' }}>
        <Text>Chart not found</Text>
        <Link href="/charts">Back to Charts</Link>
      </VStack>
    )
  }

  return (
    <VStack w="100%" maxW="1200px" mx="auto" py="40px" px={{ base: '20px', md: '30px' }}>
      <VStack gap="24px" w="100%">
        <Box w="100%">
          <Link href="/charts" style={{ textDecoration: 'none' }}>
            <Text color="text.secondary">← Back to Charts</Text>
          </Link>
        </Box>

        <VStack gap="8px" w="100%">
          <Text fontSize="24px" fontWeight="600" color="text.primary">
            {chart.title}
          </Text>
          <Text fontSize="16px" color="text.secondary">
            {chart.description}
          </Text>
        </VStack>

        <Box h="500px" bg="background.secondary" rounded="lg" p="24px" w="100%">
          <chart.Component data={data} />
        </Box>
      </VStack>
    </VStack>
  )
}