import { Trans } from '@lingui/macro'
import BigNumber from 'bignumber.js'
import { Box, Grid, HStack, VStack } from 'styled-system/jsx'

import OverviewSVG from '@/assets/overview.svg'
import { AppTooltip } from '@/components/app-tooltip'
import { OverflowAmount } from '@/components/overflow-amount'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { TextOverflowTooltip } from '@/components/text-overflow-tooltip'
import { TimeFormatter } from '@/components/time-formatter'
import { Heading, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { resolveBtcTime } from '@/lib/btc/resolve-btc-time'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

export function BtcBlockOverview({
  block,
}: {
  block:any
}) {
  if (!block) return null
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
        {block.time ? <TimeFormatter timestamp={resolveBtcTime(block.time)} ml="auto" /> : null}
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
          <OverviewInfoItem label={<Trans>Fee rate span</Trans>}>
            <TextOverflowTooltip
              label={
                <Text whiteSpace="nowrap">
                 <Trans>${formatNumber(block.fees?.low ?? 0)} sats/vB ~ ${formatNumber(BigNumber(block.fees?.low?? 0))} sats/vB</Trans>
                </Text>
              }
              contentProps={{ maxW: 'unset' }}
              positioning={{ placement: 'top' }}
            >
              <Box
                whiteSpace="nowrap"
                minW="0"
                maxW={{ base: '130px', sm: 'unset', md: '250px' }}
                textAlign={{ base: 'right', md: 'center' }}
                truncate
                flex={1}
                ml="auto"
              >
                {formatNumber(block.fees?.low?? 0)}
                <Text as="span" fontSize="14px" ml="4px">
                <Trans>sats/vB</Trans>
                </Text>
                {' ~ '}
                {formatNumber(BigNumber(block.fees?.high ?? 0))}{' '}
                <Text as="span" fontSize="14px">
                <Trans>sats/vB</Trans>
                </Text>
              </Box>
            </TextOverflowTooltip>
          </OverviewInfoItem>
          <OverviewInfoItem label={<Trans>Miner</Trans>} formatNumber>
            {block.miner ? (
              <AppTooltip
                trigger={
                  <Link
                    href={`/address/${block.miner}`}
                    color="brand"
                    textAlign={{ base: 'right', md: 'center' }}
                    _hover={{
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    {truncateMiddle(block.miner, 5, 5)}
                  </Link>
                }
                content={block.miner.address}
              />
            ) : (
              <Text color="text.third">-</Text>
            )}
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>
    </VStack>
  )
}
