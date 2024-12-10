'use client'

import { Trans } from '@lingui/macro'
import { Box,Grid, HStack, VStack } from 'styled-system/jsx'

import BtcIcon from '@/assets/chains/btc.svg'
import CkbIcon from '@/assets/chains/ckb.svg'
import DogeIcon from '@/assets/chains/doge.svg'
import type { HolderSummary } from '@/components/holder-list/type'
import { OverviewInfo, OverviewInfoItem } from '@/components/overview-info'
import { Text } from '@/components/ui'

interface Props {
  summary: HolderSummary
}

export function HolderSummarySection({ summary }: Props) {
  const totalHoldersCard = {
    label: <Trans>Total Holders</Trans>,
    value: summary.totalHolders,
    isTotalHolders: true
  }

  const chainHoldersCards = [
    {
      label: <Trans>BTC Chain Holders</Trans>,
      value: summary.chainHolders.btc,
      icon: <BtcIcon />
    },
    {
      label: <Trans>CKB Chain Holders</Trans>,
      value: summary.chainHolders.ckb,
      icon: <CkbIcon />
    },
    {
      label: <Trans>Doge Chain Holders</Trans>,
      value: summary.chainHolders.doge,
      icon: <DogeIcon />
    }
  ]

  return (
    <VStack gap="20px" bg="bg.card" w="100%" alignItems="start" rounded="8px" p={{ base: '20px', xl: '30px' }}>
      <Grid w="100%" gridTemplateColumns={{ base: '1fr', lg: '1fr 3fr' }} gap={{ base: '20px', md: '30px' }}>
        <OverviewInfo>
          <OverviewInfoItem label={
            <Text color="text.third" fontSize="14px" lineHeight="24px" whiteSpace="nowrap">
              {totalHoldersCard.label}
            </Text>
          } formatNumber>
            <Text color='text.link'>{totalHoldersCard.value}</Text>
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          {chainHoldersCards.map((card, index) => (
            <OverviewInfoItem key={index} label={
              <HStack gap="8px" alignItems="center" justifyContent="center">
                <Box w="18px" h="18px">{card.icon}</Box>
                <Text color="text.third" fontSize="14px" lineHeight="24px" whiteSpace="nowrap">{card.label}</Text>
              </HStack>
            } formatNumber>
              {card.value}
            </OverviewInfoItem>
          ))}
        </OverviewInfo>
      </Grid>
    </VStack>
  )
}