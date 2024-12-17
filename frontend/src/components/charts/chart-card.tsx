'use client'

import Link from 'next/link'
import { Box, Center } from 'styled-system/jsx'

import { ChartComponent } from '@/components/charts/types'
import { useChartData } from '@/components/charts/useChartData'
import { Loading } from '@/components/loading'
import { Text } from '@/components/ui'

interface ChartCardProps extends ChartComponent {
  id: string
  title: string
}

export function ChartCard({ id, title, chartRender: ChartRender }: ChartCardProps) {

  const { data, isLoading } = useChartData(id)

  return (
    <Link href={`/charts/${id}`} style={{ textDecoration: 'none' }}>
      <Box
        border="1px solid" borderColor="border.light"
        bg="bg.card.hover"
        rounded="5px"
        cursor="pointer"
        transition="all 0.2s"
        overflow="hidden"
        _hover={{ transform: 'translateY(-4px)' }}
      >
        <Box borderBottom="1px solid" borderColor="border.light" px="20px" py="15px">
          <Text fontSize="16px" fontWeight="600" color="text.primary">
            {title}
          </Text>
        </Box>

        <Box px="20px" pt="15px">
          <Box h="196px" w="100%" position="relative">
            {isLoading ? <Center h="100%" w="100%"><Loading /></Center>
              : <ChartRender data={data} preview />}
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
