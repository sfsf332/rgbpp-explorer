import { Trans } from '@lingui/macro'
import { Flex, HStack, VStack } from 'styled-system/jsx'

import CkbIcon from '@/assets/chains/ckb.svg'
import { CkbCellTables } from '@/components/ckb/ckb-cell-tables'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { ViewCkbExplorer } from '@/components/view-ckb-explorer'
import { truncateMiddle } from '@/lib/string/truncate-middle'
import { CkbTransaction } from '@/types/graphql'

export function CkbCells({
  ckbTransaction,
  isBinding,
}: {
  ckbTransaction: Pick<CkbTransaction, 'hash' | 'display_outputs' | 'display_inputs'>
  isBinding?: boolean
}) {
  return (
    <VStack w="100%" gap={0} bg="bg.card" rounded="8px">
      <Flex
        gap="20px"
        flexDir={{ base: 'column', md: 'row' }}
        w="100%"
        bg="bg.input"
        justifyContent="space-between"
        py="20px"
        px={{ base: '20px', lg: '30px' }}
        roundedTop="8px"
      >
        <HStack gap="16px">
          <CkbIcon h="40px" w="40px" />
          {isBinding ? (
            <VStack alignItems="start" gap={0}>
              <Text fontSize="16px" fontWeight="semibold"><Trans>RGB++ Binding Txn on CKB</Trans></Text>
              <Link
                href={`/transaction/${ckbTransaction.hash}`}
                color="brand"
                fontSize="14px"
                wordBreak="break-all"
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                <IfBreakpoint breakpoint="lg" fallback={truncateMiddle(ckbTransaction.hash, 10, 10)}>
                  {ckbTransaction.hash}
                </IfBreakpoint>
              </Link>
            </VStack>
          ) : (
            <Text fontSize="16px" fontWeight="semibold"><Trans>CKB Txn</Trans></Text>
          )}
        </HStack>
        <ViewCkbExplorer txHash={ckbTransaction.hash} />
      </Flex>
      <CkbCellTables outputs={ckbTransaction.display_outputs} inputs={ckbTransaction.display_inputs} />
    </VStack>
  )
}
