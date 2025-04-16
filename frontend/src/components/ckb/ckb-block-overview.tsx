import { Trans } from '@lingui/macro'
import { Grid, HStack, VStack } from 'styled-system/jsx'

import OverflowSVG from '@/assets/overview.svg'
import { OverflowAmount } from '@/components/overflow-amount'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { TimeFormatter } from '@/components/time-formatter'
import { Heading, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { formatCkbAddress } from '@/lib/address/format-ckb-address'
import { formatNumber } from '@/lib/string/format-number'

export function CkbBlockOverview({
  block,
}: {
  block: any
}) {
  if (!block) return null
  return (
    <VStack gap={0} w="100%" bg="bg.card" rounded="8px">
      <HStack w="100%" px="30px" py="16px" gap="12px" borderBottom="1px solid" borderBottomColor="border.primary">
        <OverflowSVG w="24px" />
        <Heading fontSize="16px" fontWeight="semibold"><Trans>Overview</Trans></Heading>
        {block.timestamp ? <TimeFormatter timestamp={block.timestamp} /> : null}
      </HStack>
      <Grid
        w="100%"
        gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={{ base: '20px', md: '30px' }}
        pt="20px"
        pb={{ base: '20px', md: '30px' }}
        px={{ base: '20px', xl: '30px' }}
        textAlign="center"
      >
        <OverviewInfo>
          <OverviewInfoItem label={<Trans>Block size</Trans>}>
            <OverflowAmount amount={formatNumber(block.size)} symbol={<Trans>bytes</Trans>} />
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>Transaction</Trans>} formatNumber>
            {block.txCount}
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          <OverviewInfoItem label={<Trans>Miner</Trans>}>
            {block.miner ? (
              <Link
                href={`/address/${block.miner}`}
                whiteSpace="nowrap"
                maxW="250px"
                truncate
                color="brand"
                _hover={{ 
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
                cursor="pointer"
              >
                {formatCkbAddress(block.miner)}
              </Link>
            ) : (
              <Text color="text.third">-</Text>
            )}
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>Miner Reward</Trans>} formatNumber>
            <OverflowAmount amount={formatNumber(block.blockReward.amount, 8)} symbol={<Trans>CKB</Trans>} />
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>
    </VStack>
  )
}
