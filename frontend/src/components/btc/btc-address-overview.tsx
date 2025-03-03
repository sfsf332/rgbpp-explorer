'use client'

import { Grid, HStack, VStack } from 'styled-system/jsx'
import { Trans } from '@lingui/macro'

import OverviewSVG from '@/assets/overview.svg'
import { OverflowAmount } from '@/components/overflow-amount'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { Heading } from '@/components/ui'
import { BtcAddressBaseQuery } from '@/gql/graphql'
import { satsToBtc } from '@/lib/btc/sats-to-btc'
import { formatNumber } from '@/lib/string/format-number'
import { use } from 'react'
import { useAddressInfoBTC } from '@/hooks/useRgbppData'

export function BtcAddressOverview({ btcAddress }: { btcAddress: string }) {
  if (!btcAddress) return null
  const { btcInfo, isLoading, error } = useAddressInfoBTC(btcAddress)

  return (
    <VStack gap={0} w="100%" bg="bg.card" rounded="8px">
      <HStack w="100%" px="30px" py="16px" gap="12px" borderBottom="1px solid" borderBottomColor="border.primary">
        <OverviewSVG w="24px" />
        <Heading fontSize="16px" fontWeight="semibold">
          <Trans>Overview</Trans>
        </Heading>
      </HStack>
      <Grid
        w="100%"
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={{ base: '20px', xl: '30px' }}
        pt="20px"
        pb={{ base: '20px', xl: '30px' }}
        px={{ base: '20px', xl: '30px' }}
        textAlign="center"
      >
        {btcInfo && (
          <>
            <OverviewInfo>
              <OverviewInfoItem label={<Trans>BTC Balance</Trans>}>
                <OverflowAmount amount={formatNumber(satsToBtc(btcInfo.chain.sats))} symbol={<Trans>BTC</Trans>} />
              </OverviewInfoItem>
              <OverviewInfoItem label={<Trans>Confirmed</Trans>}>
                <OverflowAmount
                  amount={formatNumber(satsToBtc(btcInfo.chain.sats).minus(btcInfo.mempool.sats))}
                  symbol={<Trans>BTC</Trans>}
                />
              </OverviewInfoItem>
              <OverviewInfoItem label={<Trans>Unconfirmed</Trans>}>
                <OverflowAmount amount={formatNumber(satsToBtc(btcInfo.mempool.sats))} symbol={<Trans>BTC</Trans>} />
              </OverviewInfoItem>
            </OverviewInfo>
            <OverviewInfo>
              <OverviewInfoItem label={<Trans>Txns</Trans>} formatNumber>
                {btcInfo.chain.tx.count}
              </OverviewInfoItem>
              <OverviewInfoItem label={<Trans>L1 RGB++ Assets</Trans>} unsupported />
            </OverviewInfo>
          </>
        )}
      </Grid>
    </VStack>
  )
}
