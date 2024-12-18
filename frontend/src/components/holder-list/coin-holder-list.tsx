'use client'

import { Trans } from '@lingui/macro'
import { Box, HStack, VStack } from 'styled-system/jsx'

import BTCIcon from '@/assets/chains/btc.svg'
import CKBIcon from '@/assets/chains/ckb.svg'
import DOGEIcon from '@/assets/chains/doge.svg'
import Rank1Icon from '@/assets/rank-1.svg'
import Rank2Icon from '@/assets/rank-2.svg'
import Rank3Icon from '@/assets/rank-3.svg'
import { HolderData } from '@/components/holder-list/type'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { Table, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'


export function CoinHolderList({
  holders,
  totalSupply
}: {
  holders: HolderData[]
  totalSupply: number
}) {
  const isMd = useBreakpoints('md')
  const isLg = useBreakpoints('lg')

  const renderRank = (rank: number) => {
    switch (rank) {
      case 1:
        return <Rank1Icon w="24px" />
      case 2:
        return <Rank2Icon w="24px" />
      case 3:
        return <Rank3Icon w="24px" />
      default:
        return <Text w="24px" textAlign="center">{rank}</Text>
    }
  }

  const renderChain = (chain: string) => {
    switch (chain) {
      case 'CKB':
        return (
          <HStack gap="8px" alignItems="center">
            <CKBIcon w={{ base: '14px', md: '18px'}} h={{ base: '14px', md: '18px'}}/>
            <Text>CKB</Text>
          </HStack>
        )
      case 'BTC':
        return (
          <HStack gap="8px" alignItems="center">
            <BTCIcon w={{ base: '14px', md: '18px'}} h={{ base: '14px', md: '18px'}} />
            <Text>BTC</Text>
          </HStack>
        )
      case 'DOGE':
        return (
          <HStack gap="8px" alignItems="center">
            <DOGEIcon w={{ base: '14px', md: '18px'}} h={{ base: '14px', md: '18px'}} />
            <Text>DOGE</Text>
          </HStack>
        )
      default:
        return chain
    }
  }

  const calculatePositionRatio = (value: number): string => {
    return ((value / totalSupply) * 100).toFixed(2) + '%'
  }

  if (!isMd) {
    return holders.map((holder) => {
      return (
        <Link
          href={`/address/${holder.address}`}
          display="flex"
          alignItems="center"
          fontSize="14px"
          p="20px"
          key={holder.address}
          w="100%"
          flexDirection="column"
          borderBottom="1px solid"
          borderBottomColor="border.primary"
          transition="100ms"
          _hover={{
            bg: 'bg.card.hover',
          }}
          _last={{
            borderBottom: 'none',
          }}
        >
          <VStack alignItems="start" w="100%" h="32px">
            <HStack justifyContent="start" w="100%" gap="5px">
              {renderRank(holder.rank)}
              <Box lineHeight="20px" color="text.link">{truncateMiddle(holder.address, 10, 8)}</Box>
            </HStack>
          </VStack>
          <HStack gap={8} alignItems="center" justify="space-between" w="100%" py="10px">
            <VStack gap="5px" alignItems="start">
              <Box lineHeight="20px" color="text.third">
                <Trans>Chain</Trans>
              </Box>
              <Box color="text.primary" fontSize="14px" lineHeight="16px">
                {renderChain(holder.chain)}
              </Box>
            </VStack>
            <VStack gap="5px" alignItems="start">
              <Box lineHeight="20px" color="text.third">
                <Trans>Position Ratio</Trans>
              </Box>
              <Box color="text.primary" fontSize="14px" lineHeight="16px">
                {(holder.percentage*100).toFixed(2) + '%'}
              </Box>
            </VStack>
            <VStack gap="5px" alignItems="start">
              <Box lineHeight="20px" color="text.third">
                <Trans>Amount</Trans>
              </Box>
              <Box color="text.primary" fontSize="14px" lineHeight="16px">
                {formatNumber(holder.value)}
              </Box>
            </VStack>
          </HStack>
        </Link>
      )
    })
  }

  return (
    <Table.Root tableLayout="fixed">
      <Table.Head>
        <Table.Row>
          <Table.Header w="80px">
            <Trans>Rank</Trans>
          </Table.Header>
          <Table.Header w={{ base: '200px', lg: '254px' }}>
            <Trans>Address</Trans>
          </Table.Header>
          <Table.Header w="160px">
            <Trans>Chain</Trans>
          </Table.Header>
          <Table.Header w="190px">
            <Trans>Amount</Trans>
          </Table.Header>
          
          <Table.Header w="135px">
            <Trans>Position Ratio</Trans>
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {holders.map((holder) => {
          return (
            <Table.Row key={holder.address}>
              <Table.Cell>
                {renderRank(holder.rank)}
              </Table.Cell>
              <Table.Cell>
                <Link href={`/address/${holder.address}`} display="flex" alignItems="center" gap={3} color="text.link">
                  <IfBreakpoint breakpoint="lg" fallback={truncateMiddle(holder.address, 6, 4)}>
                    {truncateMiddle(holder.address, 10, 10)}
                  </IfBreakpoint>
                </Link>
              </Table.Cell>
              <Table.Cell>
                {renderChain(holder.chain)}
              </Table.Cell>
              <Table.Cell>
                {formatNumber(holder.value)}
              </Table.Cell>
              <Table.Cell>
              {(holder.percentage*100).toFixed(2) + '%'}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
