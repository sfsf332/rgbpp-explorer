'use client'

import Link from 'next/link'
import { Box } from 'styled-system/jsx'

import { ChartComponent } from '@/components/charts/types'
import { Text } from '@/components/ui'

interface ChartCardProps extends ChartComponent {
  id: string
  title: string
}

export function ChartCard({ id, title, Component }: ChartCardProps) {
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
            <Component preview />
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
