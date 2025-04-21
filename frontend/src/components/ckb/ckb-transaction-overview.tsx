import { Trans } from '@lingui/macro'
import { Grid, HStack, VStack } from 'styled-system/jsx'

import OverflowSVG from '@/assets/overview.svg'
// import { OverflowAmount } from '@/components/overflow-amount'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { TimeFormatter } from '@/components/time-formatter'
import { Heading } from '@/components/ui'
import Link from '@/components/ui/link'
// import { shannonToCKB } from '@/lib/ckb/shannon-to-ckb'
import { formatNumber } from '@/lib/string/format-number'
import { CkbTransaction } from '@/types/graphql'

export function CkbTransactionOverview({ ckbTransaction }: { ckbTransaction: CkbTransaction }) {
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
        <OverflowSVG w="24px" />
        <Heading fontSize="16px" fontWeight="semibold"><Trans>Overview</Trans></Heading>
        {ckbTransaction.block_timestamp ? <TimeFormatter timestamp={ckbTransaction.block_timestamp} /> : null}
      </HStack>
      <Grid
        w="100%"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={{ base: '20px', md: '30px' }}
        pt="20px"
        pb={{ base: '20px', md: '30px' }}
        px={{ base: '20px', md: '30px' }}
        textAlign="center"
      >
        <OverviewInfo>
          <OverviewInfoItem label={<Trans>Block Height</Trans>}>
            <Link
              href={`/block/ckb/${ckbTransaction.block_number}`}
              color="brand"
              _hover={{ 
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {formatNumber(ckbTransaction.block_number)}
            </Link>
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>Size</Trans>} formatNumber unit={<Trans>bytes</Trans>}>
             {ckbTransaction.size}
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          {/* <OverviewInfoItem label={<Trans>Fee</Trans>}>
            <OverflowAmount amount={formatNumber(shannonToCKB(ckbTransaction?.fee ?? 0))} symbol={<Trans>CKB</Trans>} />
          </OverviewInfoItem> */}
          <OverviewInfoItem label={<Trans>Fee Rate</Trans>}>
            {ckbTransaction.fee_rate ?? 0} <Trans>shannons/kB</Trans>
            {/* <OverflowAmount amount={formatNumber(ckbTransaction?.feeRate)} symbol={<Trans>shannons/kB</Trans>} /> */}
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>
    </VStack>
  )
}
