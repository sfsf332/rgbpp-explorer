'use client'
import { Trans } from '@lingui/macro'
import { useState } from 'react'
import { Box, HStack, VStack } from 'styled-system/jsx'

import BtcIcon from '@/assets/chains/btc.svg'
import CkbIcon from '@/assets/chains/ckb.svg'
import DogeIcon from '@/assets/chains/doge.svg'
import { AgoTimeFormatter } from '@/components/ago-time-formatter'
import { Copier } from '@/components/copier'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { Amount } from '@/components/latest-tx-list/amount'
import { LayerType } from '@/components/layer-type'
import {Table  } from '@/components/ui'
import Link from '@/components/ui/link'
import type { CkbTransaction, RgbppTransaction } from '@/gql/graphql'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { resolveLayerTypeFromRGBppTransaction } from '@/lib/resolve-layer-type-from-rgbpp-transaction'
import { resolveRGBppTxHash } from '@/lib/resolve-rgbpp-tx-hash'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

const filterType = [
  { label: 'BTC', value: 'BTC', icon: <BtcIcon w="18px" h="18px" mr="4px" /> },
  { label: 'CKB', value: 'CKB', icon: <CkbIcon w="18px" h="18px" mr="4px" /> },
  { label: 'DOGE', value: 'DOGE', icon: <DogeIcon w="18px" h="18px" mr="4px" /> },
  { label: 'Leap (Cross-Chain)', value: 'LEAP' },
]

export function LatestRGBTxnListUI<
  T extends Pick<
    RgbppTransaction,
    'ckbTransaction' | 'blockNumber' | 'timestamp' | 'leapDirection' | 'btcTxid' | 'ckbTxHash'
  >,
>({ txs }: { txs: T[] }) {
  const isMd = useBreakpoints('md')
  const isLg = useBreakpoints('lg')
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  if (!isMd) {
    return txs.map((tx) => {
      const txHash = resolveRGBppTxHash(tx)
      return (
        <Link
          href={`/transaction/${txHash}`}
          display="flex"
          alignItems="center"
          gap={5}
          fontSize="14px"
          fontWeight="semibold"
          p="20px"
          key={tx.ckbTxHash}
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
          <HStack gap={3} alignItems="center" w="100%" color="text.link">
            {/* <LinkOutlineIcon w="36px" h="36px" color="text.third" /> */}
            <VStack gap={0} alignItems="start">
              <Box lineHeight="20px">{truncateMiddle(txHash, 10, 8)}</Box>
              <Box color="text.third" fontWeight="medium" lineHeight="16px">
                <AgoTimeFormatter time={tx.timestamp} tooltip />
              </Box>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <LayerType type={resolveLayerTypeFromRGBppTransaction(tx)} />
            <Box>
              <Amount ckbTransaction={tx.ckbTransaction as CkbTransaction} />
            </Box>
          </HStack>
        </Link>
      )
    })
  }

  return (
    <Table.Root tableLayout="fixed">
      <Table.Head>
        <Table.Row>
          <Table.Header w={{ base: '200px', lg: '254px' }}>
            <Trans>Tx hash</Trans>
          </Table.Header>
          {isLg ? (
            <Table.Header w="140px">
              <Trans>Block Height</Trans>
            </Table.Header>
          ) : null}
          <Table.Header w="160px">
            <Trans>Type</Trans>
          </Table.Header>
          <Table.Header w="190px">
            <Trans>Amount</Trans>
          </Table.Header>
          <Table.Header w="135px">
            <Trans>Time</Trans>
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {txs.map((tx) => {
          const txHash = resolveRGBppTxHash(tx)
          return (
            <Table.Row key={txHash}>
              <Table.Cell>
                <Copier onlyIcon value={txHash}>
                  <Link
                    href={`/transaction/${txHash}`}
                    display="flex"
                    fontSize="14px"
                    alignItems="center"
                    gap={3}
                    color="text.link"
                  >
                    <IfBreakpoint breakpoint="lg" fallback={truncateMiddle(txHash, 6, 4)}>
                      {truncateMiddle(txHash, 10, 10)}
                    </IfBreakpoint>
                  </Link>
                </Copier>

                {/* <CopyIconEl display="inline-block" value={txHash} /> */}
              </Table.Cell>
              {isLg ? <Table.Cell>{formatNumber(tx.blockNumber)}</Table.Cell> : null}
              <Table.Cell>
                <LayerType type={resolveLayerTypeFromRGBppTransaction(tx)} />
              </Table.Cell>
              <Table.Cell>
                <Amount ckbTransaction={tx.ckbTransaction as CkbTransaction} />
              </Table.Cell>
              <Table.Cell>
                <AgoTimeFormatter time={tx.timestamp} tooltip />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
