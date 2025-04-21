'use client'

import { Trans } from '@lingui/macro'
import { Box, Flex, Grid, HStack, VStack } from 'styled-system/jsx'

import SubTractIcon from '@/assets/subtract.svg'
import { Copier } from '@/components/copier'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { Heading, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'
import { CkbCell } from '@/types/graphql'

export interface CellTablesProps {
  inputs?: CkbCell[] | null
  outputs?: CkbCell[] | null
  isCellbase?: boolean
  address?: string
}

export function CkbCellTables({ inputs = [], outputs = [], isCellbase, address }: CellTablesProps) {
  if (!inputs) inputs = []
  if (!outputs) outputs = []

  return (
    <Grid
      w="100%"
      gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
      gap={{ base: '20px', lg: '38px' }}
      pt="10px"
      pb="20px"
      px={{ base: '20px', md: '30px' }}
    >
      <VStack gap={0} w="100%">
        <Heading
          fontSize="14px"
          fontWeight="semibold"
          borderBottom="1px solid"
          borderBottomColor="border.primary"
          w="100%"
          h="60px"
          lineHeight="60px"
        >
          <Trans>Inputs ({inputs.length})</Trans>
        </Heading>
        {isCellbase ? (
          <Flex
            align="center"
            w="100%"
            h="60px"
            alignItems="center"
            borderBottom="1px solid"
            borderBottomColor="border.primary"
          >
            <HStack gap="8px">
              <SubTractIcon w="16px" h="16px" color="text.third" />
              <Text fontSize="14px" fontWeight="semibold">
                <Trans>Coinbase</Trans>
              </Text>
            </HStack>
          </Flex>
        ) : null}
        {inputs.map((input, i) => (
          <Cell cell={input} key={i} address={address} />
        ))}
      </VStack>
      <VStack gap={0}>
        <Heading
          fontSize="14px"
          fontWeight="semibold"
          borderBottom="1px solid"
          borderBottomColor="border.primary"
          w="100%"
          h="60px"
          lineHeight="60px"
        >
          <Trans>Outputs ({outputs.length})</Trans>
        </Heading>
        {outputs.map((output, i) => (
          <Cell cell={output} key={i} address={address} />
        ))}
      </VStack>
    </Grid>
  )
}

function Cell({ cell, address: currentAddress }: { cell: CkbCell; address?: string }) {
  const address = cell.address_hash
  const formattedAddress = (
    <IfBreakpoint breakpoint="sm" fallback={truncateMiddle(address, 6, 6)}>
      {truncateMiddle(address, 10, 10)}
    </IfBreakpoint>
  )
  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      minH="60px"
      py="8px"
      alignItems="center"
      borderBottom="1px solid"
      borderBottomColor="border.primary"
    >
      <HStack gap="8px">
        <Copier onlyIcon value={address}>
          {currentAddress !== address ? (
            <Link
              href={`/address/${address}`}
              color="brand"
              fontSize="14px"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              {formattedAddress}
            </Link>
          ) : (
            <Text fontSize="14px" color="text.primary">
              {formattedAddress}
            </Text>
          )}
        </Copier>
      </HStack>
      <VStack gap={0} alignItems="flex-end" fontSize={{ base: '14px', md: '16px' }} textAlign="right">
        <Box>
          {formatNumber(cell.capacity, 8)}{' '}
          <Text as="span" fontSize="12px" color="text.third">
            <Trans>CKB</Trans>
          </Text>
        </Box>
        {cell.assetId ? (
          <Box>
            {formatNumber(cell.amount || '0', 8)}{' '}
            <Text as="span" fontSize="12px" color="text.third">
              {cell.symbol}
            </Text>
          </Box>
        ) : null}
        {cell.cell_type === 'normal' ? (
          <Box>
            1
            <Text as="span" fontSize="12px" color="text.third" ml="4px">
              <Trans>DOB</Trans>
            </Text>
          </Box>
        ) : null}
      </VStack>
    </Flex>
  )
}
