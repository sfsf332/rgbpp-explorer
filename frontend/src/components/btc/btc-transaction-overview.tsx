import {  Trans } from '@lingui/macro'
import { Grid, HStack, VStack } from 'styled-system/jsx'

import OverviewSVG from '@/assets/overview.svg'
import { OverflowAmount } from '@/components/overflow-amount'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
// import { TimeFormatter } from '@/components/time-formatter'
import { Heading } from '@/components/ui'
import Link from '@/components/ui/link'
// import { resolveBtcTime } from '@/lib/btc/resolve-btc-time'
import { formatNumber } from '@/lib/string/format-number'
import { BitcoinTransaction } from '@/types/graphql'

export function BtcTransactionOverview({ btcTransaction }: { btcTransaction: BitcoinTransaction; }) {
  return (
    <VStack gap={0} w="100%" bg="bg.card" rounded="8px">
      <HStack
        w="100%"
        px={{ base: '20px', xl: '30px' }}
        py="16px"
        gap="12px"
        borderBottom="1px solid"
        borderBottomColor="border.primary"
      >
        <OverviewSVG w="24px" />
        <Heading fontSize="16px" fontWeight="semibold"><Trans>Overview</Trans></Heading>
        {/* {btcTransaction.timestamp ? (
          <TimeFormatter timestamp={resolveBtcTime(btcTransaction.timestamp)} />
        ) : null} */}
      </HStack>
      <Grid
        w="100%"
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={{ base: '20px', md: '30px' }}
        pt="20px"
        pb={{ base: '20px', md: '30px' }}
        px={{ base: '20px', md: '30px' }}
        textAlign="center"
      >
        <OverviewInfo>
          <OverviewInfoItem label={<Trans>Block Height</Trans>}>
            {btcTransaction.blockHeight ? (
              <Link
                href={`/block/btc/${btcTransaction.blockHeight}`}
                color="brand"
                _hover={{ 
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                {formatNumber(btcTransaction.blockHeight)}
              </Link>
            ) : (
              <Trans>Unconfirmed</Trans>
            )}
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>Size</Trans>}>
            {btcTransaction.size ? (
              <OverflowAmount amount={formatNumber(btcTransaction.size)} symbol={<Trans>bytes</Trans>} />
            ) : (
              <Trans>Unknown</Trans>
            )}
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          <OverviewInfoItem label={<Trans>Fee</Trans>}>
            {btcTransaction.fee ? (
              <OverflowAmount amount={formatNumber(btcTransaction.fee)} symbol={<Trans>sats</Trans>} />
            ) : (
              <Trans>Unknown</Trans>
            )}
          </OverviewInfoItem>
          {/* <OverviewInfoItem label={<Trans>Fee Rate</Trans>}>
            {btcTransaction.feeRate ? (
              <OverflowAmount amount={formatNumber(btcTransaction.feeRate)} symbol={<Trans>sat/vB</Trans>} />
            ) : (
              <Trans>Unknown</Trans>
            )}
          </OverviewInfoItem> */}
        </OverviewInfo>
      </Grid>
    </VStack>
  )
}
