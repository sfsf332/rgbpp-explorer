'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Link from 'next/link'
import { Box, Flex, VStack } from 'styled-system/jsx'

import { Text } from '@/components/ui'
import { useBreakpoints } from '@/hooks/useBreakpoints'

interface StatItemProps {
  value: string
  label: string
  showDivider: boolean
  link?: string
}

function StatItem({ value, label, showDivider, link }: StatItemProps) {
  const Content = (
    <VStack
      gap={1}
      alignItems="center"
      position="relative"
      w="100%"
      cursor={link ? 'pointer' : 'default'}
      _hover={link ? {
        '& > *': { color: 'brand' }
      } : undefined}
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
      <Text fontSize={{ base: '20px', sm: '30px', lg: '36px' }} fontWeight="600" transition="color 0.2s">
        {value}
      </Text>
      <Text fontSize={{ base: '14px', sm: '16px', lg: '16px' }} color="text.third" transition="color 0.2s">
        {label}
      </Text>
    </VStack>
  )

  if (link) {
    return (
      <Link href={link} style={{ width: '100%', display: 'block' }}>
        {Content}
      </Link>
    )
  }

  return Content
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
  const { i18n } = useLingui()

  const items = [
    { value: marketCap, label: t(i18n)`Market Cap (USD)` },
    { value: totalAssets, label: t(i18n)`Total Number of Assets`, link: '/charts/total-assets' },
    { value: totalHolders, label: t(i18n)`Total Holders`, link: '/charts/total-holders' },
    /*{ value: totalOccupiedCkb, label: t(i18n)`Total Occupied CKB` },*/
  ];

  const shouldShowDivider = (index: number) => {
    const itemsPerRow = isDesktop ? 4 : isTablet ? 2 : 1;
    const isLastInRow = (index + 1) % itemsPerRow === 0;
    const isLastItem = index === items.length - 1;
    
    if (isLastItem) return false;
    if (isDesktop || isTablet) return !isLastInRow;
    return true;
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
        <Flex
          w="100%"
          flexWrap="wrap"
          justifyContent="center"
          gap={{ base: '40px', sm: '30px', lg: '30px' }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              flex={{ base: '1 1 100%', sm: '1 1 calc(50% - 15px)', lg: '1 1 calc(25% - 22.5px)' }}
              display="flex"
              justifyContent="center"
            >
              <StatItem
                value={item.value}
                label={item.label}
                link={item.link}
                showDivider={shouldShowDivider(index)}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
