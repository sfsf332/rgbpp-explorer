'use client'

import { Trans } from '@lingui/react'
import { HomeRgbppTxnsOverview } from 'src/components/latest-tx-list'
import { Center, Flex } from 'styled-system/jsx'

import HomeBgSVG from '@/assets/home-bg.svg'
import { HomeTitle } from '@/components/home-title'
import { NetworkCards } from '@/components/network-cards'
import { RgbppStatisticsOverview } from '@/components/rgbpp-statistics-overview'
import { SearchBar } from '@/components/search-bar'
import { Heading } from '@/components/ui'

export default function Home({ params: { lang } }: { params: { lang: string } }) {

    <>
      <Center flexDir="column" w="100%" position="relative" px={{ base: '20px', xl: '30px' }}>
        <HomeBgSVG w="100%" pos="absolute" top={{ base: '100px', sm: "50px", lg: '50px' }} left="0" />
        <Flex
          w="100%"
          direction="column"
          pos="relative"
          aspectRatio={{ base: 1440 / 1100, sm: 1440 / 800, lg: 1440 / 700, xl: 1440 / 700, '2xl': 1440 / 680 }}
        >
          <Flex w="100%" direction="column" textAlign="center" align="center" justify="start" gap={{ base:'54px', sm: '80px', lg: '100px'}} pb="40px">
            <HomeTitle />
            {/* <HomeQuickInfo /> */}
            <SearchBar />
          </Flex>
        </Flex>
      </Center>
      <Center w="100%" position="relative" mb="54px" px={{ base: '20px', xl: '30px' }}>
        <Flex maxW="content" direction="column" alignItems="center" justify="start" w="100%">
          <Heading
            fontSize={{ base: '22px', sm: '32px', xl: '40px' }}
            mb={{ base: '50px', xl: '60px' }}
            fontWeight="semibold"
          ><Trans id="RGB++ Networks">RGB++ Networks</Trans></Heading>
          <NetworkCards />
          <Heading
            fontSize={{ base: '22px', sm: '32px', xl: '40px' }}
            fontWeight="semibold"
            mb={{ base: '50px', xl: '60px' }}
            mt={{ base: '80px', xl: '100px' }}
          ><Trans id="RGB++ Statistics">RGB++ Statistics</Trans></Heading> 
           <RgbppStatisticsOverview />
          <Heading
            fontSize={{ base: '22px', sm: '32px', xl: '40px' }}
            fontWeight="semibold"
            mb={{ base: '20px', lg: '30px' }}
            mt={{ base: '80px', xl: '100px' }}
          ><Trans id="RGB++ Transactions">RGB++ Transactions</Trans></Heading>
          <HomeRgbppTxnsOverview />
        </Flex>
      </Center>
    </>
  
}
