'use client'

import { Box, Flex, VStack } from 'styled-system/jsx'

import { AgoTimeFormatter } from '@/components/ago-time-formatter'
import { Amount } from '@/components/latest-tx-list/amount'
import { LayerType } from '@/components/layer-type'
import { TextOverflowTooltip } from '@/components/text-overflow-tooltip'
import { Table } from '@/components/ui'
import Link from '@/components/ui/link'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { resolveLayerTypeFromRGBppTransaction } from '@/lib/resolve-layer-type-from-rgbpp-transaction'
import { truncateMiddle } from '@/lib/string/truncate-middle'
import { RgbppTransaction } from '@/types/graphql'
// import { CkbTransaction } from '@/types/graphql'

type Transaction = Omit<Pick<RgbppTransaction, 'ckbTransaction' | 'timestamp' | 'network' | 'txHash'>, 'btc' | 'direction'> & {
  btc?: { txid: string | null };
  direction?: 'on' | 'off' | 'within' | null;
}

export function ExplorerTxListUI({ txs, type }: { txs: Transaction[]; type: string }) {
  const isMd = useBreakpoints('md')
  if (!isMd) {
    return txs.map(({ txHash, ...tx }) => {
      const amount = <Amount transaction={tx.ckbTransaction as any} />
      return (
        <Link
          href={`/transaction/${txHash}`}
          display="grid"
          gridTemplateColumns="repeat(2, calc(50% - 4px))"
          gap="8px"
          key={txHash}
          w="100%"
          justifyContent="space-between"
          py="16px"
          px="20px"
          borderBottom="1px solid"
          borderBottomColor="border.primary"
          transition="100ms"
          _hover={{
            bg: 'bg.card.hover',
          }}
        >
          <VStack fontSize="14px" alignItems="start" gap="4px">
            <Box color="text.link">{truncateMiddle(txHash ?? '', 6, 6)}</Box>
            <Box fontWeight="medium" color="text.secondary">
              <AgoTimeFormatter time={tx.timestamp} tooltip />
            </Box>
          </VStack>
          <Flex flexDir="column" alignItems="end" justifyContent="center">
            <TextOverflowTooltip label={amount}>
              <Box truncate w="100%" textAlign="right">
                {amount}
              </Box>
            </TextOverflowTooltip>
          </Flex>
        </Link>
      )
    })
  }

  return (
    <Table.Root tableLayout="fixed">
      <Table.Body>
        {txs.map(({ txHash, ...tx }) => {
          return (
            <Table.Row key={txHash} lineHeight="36px">
              <Table.Cell w="235px">
                {type!=='ckb'?  
                <Link href={`/transaction/${tx.btc?.txid ?? txHash}`} display="flex" alignItems="center" gap={3} color="text.link">
                  {truncateMiddle(tx.btc?.txid ?? txHash, 10, 8)}
                </Link> 
                : 
                <Link href={`/transaction/${txHash}`} display="flex" alignItems="center" gap={3} color="text.link">
                  {truncateMiddle(txHash ?? '', 10, 8)}
                </Link>
                }
              </Table.Cell>
              <Table.Cell w="140px" display={{ base: 'none', lg: 'table-cell' }}>
                <LayerType type={resolveLayerTypeFromRGBppTransaction(tx)} />
              </Table.Cell>
              <Table.Cell w="140px">
                <AgoTimeFormatter time={tx.timestamp} tooltip />
              </Table.Cell>
              <Table.Cell textAlign="right" w="160px">
                <Amount transaction={tx.ckbTransaction as any} />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}