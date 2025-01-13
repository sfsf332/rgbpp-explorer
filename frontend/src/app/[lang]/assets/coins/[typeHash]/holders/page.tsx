'use client'
import { Trans } from '@lingui/macro'
import BigNumber from 'bignumber.js'
import { useParams } from 'next/navigation'
import { Box, Center, Flex, HStack, VStack } from 'styled-system/jsx'

import { ComingSoon } from '@/components/coming-soon'
// import { CoinHolderList } from '@/components/holder-list/coin-holder-list'
import { HolderSummarySection } from '@/components/holder-list/holder-summary'
// import { Chain } from '@/components/holder-list/type'
import { LoadingBox } from '@/components/loading-box'
import { Heading } from '@/components/ui'
import { useAssetInfo } from '@/hooks/useRgbppData'

export default function Page() {
  const params = useParams()

  const holders = null// useAssetHolders(params.typeHash as string)
  const { assetInfo } = useAssetInfo(params.typeHash as string)

  const holderSummary = {
    totalHolders: assetInfo?.quote?.holderCount?.reduce((sum, item) => sum + item.count, 0) || 0,
    chainHolders: {
      btc: assetInfo?.quote?.holderCount?.find((item) => item.network.toLowerCase() === 'btc')?.count || 0,
      ckb: assetInfo?.quote?.holderCount?.find((item) => item.network.toLowerCase() === 'ckb')?.count || 0,
      doge: assetInfo?.quote?.holderCount?.find((item) => item.network.toLowerCase() === 'doge')?.count || 0,
    },
  }

  const totalSupply = assetInfo?.quote?.totalSupply
  ? new BigNumber(assetInfo?.quote?.totalSupply).dividedBy(new BigNumber(10).pow(assetInfo?.info?.decimals || 0)).toNumber()
  : 0

  return (
    <VStack w="100%" maxW="content" gap="30px">
      {assetInfo ? (
        <HolderSummarySection summary={holderSummary} />
      ) : (
        <VStack w="100%" maxW="content" flex={1} gap="32px">
          <Center h="176px" w="100%" rounded="8px" overflow="hidden">
            <LoadingBox />
          </Center>
        </VStack>
      )}
      <Box w="100%" bg="bg.card" flexDir="column" alignItems="center" rounded="8px">
        <Flex
          gap="20px"
          flexDir={{ base: 'column', md: 'row' }}
          w="100%"
          bg="bg.input"
          justifyContent="space-between"
          py="20px"
          px={{ base: '20px', lg: '30px' }}
          roundedTop="8px"
        >
          <HStack gap="16px">
            <Heading fontSize="20px" fontWeight="semibold" w="100%" textAlign="left">
              {/* <Trans>{holderSummary.totalHolders} Holders</Trans> */}
              <Trans>Top Holders</Trans>
            </Heading>
          </HStack>
        </Flex>
        <Box p="0px">
          {/* holders ? (
            <CoinHolderList
              holders={holders.map((holder, index) => ({
                address: holder.address,
                chain: holder.network.toUpperCase() as Chain,
                value: Number(holder.value),
                percentage: Number(holder.percentage),
                rank: index + 1,
                amount: holder.amount,
              }))}
              totalSupply={totalSupply}
            />
          ) : <ComingSoon />*/}
          <ComingSoon />
        </Box>
      </Box>
    </VStack>
  )
}
