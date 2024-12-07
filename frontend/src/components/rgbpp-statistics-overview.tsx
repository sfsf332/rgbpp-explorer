'use client'

import { Box, Grid, VStack } from 'styled-system/jsx'

import { Text } from '@/components/ui'
import { useBreakpoints } from '@/hooks/useBreakpoints'

interface StatItemProps {
  value: string
  label: string
  showDivider: boolean
}

function StatItem({ value, label, showDivider }: StatItemProps) {
  return (
    <VStack
      gap={1}
      alignItems="center"
      position="relative"
      w="100%"
      _after={{
        content: showDivider ? '""' : 'none',
        position: 'absolute',
        right: { base: '0', sm: '0', lg: '0' },
        top: { base: '100%', sm: '50%', lg: '50%' },
        width: { base: '100%', sm: '1px', lg: '1px' },
        height: { base: '1px', sm: '70%', lg: '70%' },
        background: 'border.light',
        transform: { base: 'none', sm: 'translateY(-50%)', lg: 'translateY(-50%)' },
        marginTop: { base: '20px', sm: '0', lg: '0' }
      }}
    >
      <Text fontSize={{ base: '20px', sm: '30px', lg: '36px' }} fontWeight="600">
        {value}
      </Text>
      <Text fontSize={{ base: '14px', sm: '16px', lg: '16px' }} color="text.third">
        {label}
      </Text>
    </VStack>
  )
}

interface RgbppStatisticsOverviewProps {
  marketCap: string
  totalAssets: string
  totalHolders: string
  totalOccupiedCkb: string
}

export function RgbppStatisticsOverview({
  marketCap,
  totalAssets,
  totalHolders,
  totalOccupiedCkb,
}: RgbppStatisticsOverviewProps) {
  const isTablet = useBreakpoints('sm')
  const isDesktop = useBreakpoints('lg')

  const items = [
    { value: marketCap, label: "Market Cap (USD)" },
    { value: totalAssets, label: "Total Number of Assets" },
    { value: totalHolders, label: "Total Holders" },
    { value: totalOccupiedCkb, label: "Total Occupied CKB" }
  ];

  const shouldShowDivider = (index: number) => {
    if (isDesktop) {
      return index < items.length - 1
    }
    if (isTablet) {
      return index % 2 === 0 && index < items.length - 1
    }
    return index < items.length - 1
  }

  return (
    <Box position="relative" w="100%">
      {/* linear-gradient */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="linear-gradient(94.8deg, #F51C1C 1.36%, #F6BC28 26.88%, #26F384 51.92%, #27BDB7 75.04%, #287BF6 96.23%)"
        opacity="0.3"
        filter="blur(150px)"
        borderRadius={{ base: '16px', sm: '999px', lg: '999px' }}
      />
      
      {/* content */}
      <Box
        position="relative"
        w="100%"
        h="100%"
        border="1px solid"
        borderColor="border.light"
        borderRadius={{ base: '16px', sm: '999px', lg: '999px' }}
        px={{ base: '20px', sm: '30px', lg: '50px' }}
        py={{ base: '20px', sm: '20px', lg: '30px' }}
      >
        <Grid
          w="100%"
          h="100%"
          gridTemplateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={{ base: '40px', sm: '30px', lg: '0' }}
          alignItems="center"
        >
          {items.map((item, index) => (
            <StatItem
              key={index}
              value={item.value}
              label={item.label}
              showDivider={shouldShowDivider(index)}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
