'use client'

import { Grid, VStack } from 'styled-system/jsx'

import { chartCategories } from '@/app/[lang]/charts/charts'
import { ChartCard } from '@/components/charts/chart-card'
import { Text } from '@/components/ui'

export default function ChartsPage() {
  return (
    <VStack w="100%" maxW="1200px" mx="auto" gap={30} py="40px" px={{ base: '20px', md: '30px' }}>
      {chartCategories.map(category => (
        <VStack key={category.id} w="100%" gap={4} bg="bg.card" rounded="8px" p="30px">
          <Text fontSize="2xl" fontWeight="bold">
            {category.title}
          </Text>
          <Grid
            w="100%"
            gridTemplateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={5}
            justifyContent="start"
          >
            {category.charts.map(chart => (
              <ChartCard key={chart.id} id={chart.id} title={chart.title} Component={chart.Component} />
            ))}
          </Grid>
        </VStack>
      ))}
    </VStack>
  )
}
