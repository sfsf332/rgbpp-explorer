'use client'

import { Trans } from '@lingui/macro'
import { Box, HStack, VStack } from 'styled-system/jsx'

import { AgoTimeFormatter } from '@/components/ago-time-formatter'
import { Copier } from '@/components/copier'
import { BtcAmount } from '@/components/latest-tx-list/btc-amount'
import { Table, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { ViewBtcExplorer } from '@/components/view-btc-explorer'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

export function BtcTransactionCard({ tx }: { tx: any }) {
  return (
    <Box w="100%" bg="bg.card" rounded="8px" p="24px">
      <VStack gap="16px" alignItems="start" w="100%">
        <HStack gap="8px" alignItems="center">
          <Copier onlyIcon value={tx.hash}>
            <Link
              href={`/transaction/${tx.hash}`}
              color="brand"
              fontSize="14px"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              {truncateMiddle(tx.hash, 10, 10)}
            </Link>
          </Copier>
          <ViewBtcExplorer txid={tx.hash} />
        </HStack>

        <Table.Root tableLayout="fixed">
          <Table.Body>
            <Table.Row>
              <Table.Cell w="120px">
                <Text color="text.third">
                  <Trans>Block Height</Trans>
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Link href={`/block/${tx.blockNumber}`} color="brand">
                  {formatNumber(tx.blockNumber)}
                </Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text color="text.third">
                  <Trans>Time</Trans>
                </Text>
              </Table.Cell>
              <Table.Cell>
                <AgoTimeFormatter time={tx.time} tooltip />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text color="text.third">
                  <Trans>Amount</Trans>
                </Text>
              </Table.Cell>
              <Table.Cell>
                <BtcAmount value={tx.value} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </VStack>
    </Box>
  )
} 