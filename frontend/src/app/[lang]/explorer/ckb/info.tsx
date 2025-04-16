'use client'
import { Trans } from '@lingui/macro'
import { Grid, HStack, VStack } from 'styled-system/jsx'

import CkbIcon from '@/assets/chains/ckb.svg'
import SpeedHighIcon from '@/assets/speed/high.svg'
import SpeedLowIcon from '@/assets/speed/low.svg'
import SpeedMediumIcon from '@/assets/speed/medium.svg'
import { OverviewInfo, OverviewInfoItem, OverviewInfoTagLabel } from '@/components/overview-info'
import { Heading } from '@/components/ui'
import { useCkbInfo } from '@/hooks/useRgbppData'

export  function Info() {
  const {data:ckbChainInfo,isLoading} = useCkbInfo()

  console.log(ckbChainInfo,isLoading)
  
  return (
    ckbChainInfo && !isLoading ? 
    (<VStack gridColumn="1/3" gap="20px" bg="bg.card" p={{ base: '20px', md: '30px' }} alignItems="start" rounded="8px">
      <HStack gap="16px">
        <CkbIcon w="48px" h="48px" />
        <Heading fontSize="20px" fontWeight="bold"><Trans>CKB</Trans></Heading>
      </HStack>
      <Grid w="100%" gridTemplateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={{ base: '20px', md: '30px' }}>
        <OverviewInfo>
          <OverviewInfoItem label={<Trans>Block Height</Trans>} formatNumber>
            {ckbChainInfo.tipBlock.number}
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>L2 RGB++ Txns(24H)</Trans>} formatNumber>
            {ckbChainInfo.udtStats.txCountInLast24h}
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>RGB++ Assets Holders</Trans>} formatNumber>
            {/* {rgbppStatistic.holdersCount} */}
            {ckbChainInfo.udtStats.holders}

          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          <OverviewInfoItem
            formatNumber
            unit={<Trans>shannons/kB</Trans>}
            label={
              <OverviewInfoTagLabel bg="danger.a10" color="danger" icon={<SpeedHighIcon />}>
                <Trans>High</Trans>
              </OverviewInfoTagLabel>
            }
          >
            {ckbChainInfo.fees.high}
          </OverviewInfoItem>
          <OverviewInfoItem
            formatNumber
            unit={<Trans>shannons/kB</Trans>}
            label={
              <OverviewInfoTagLabel bg="warning.a10" color="warning" icon={<SpeedMediumIcon />}>
                <Trans>Medium</Trans>
              </OverviewInfoTagLabel>
            }
          >
            {ckbChainInfo.fees.medium}
          </OverviewInfoItem>
          <OverviewInfoItem
            formatNumber
            unit={<Trans>shannons/kB</Trans>}
            label={
              <OverviewInfoTagLabel bg="success.a10" color="success" icon={<SpeedLowIcon />}>
                <Trans>Low</Trans>
              </OverviewInfoTagLabel>
            }
          >
            {ckbChainInfo.fees.low}
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>
    </VStack>) :null  
  )
}
