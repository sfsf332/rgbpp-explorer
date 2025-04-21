'use client'

import { Trans } from '@lingui/macro'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { Box, Flex, Grid, HStack, VStack } from 'styled-system/jsx'

import SubTractIcon from '@/assets/subtract.svg'
import { parseRgbppLockArgs } from '@/components/ckb/parse-rgbpp-lock-args'
import { Copier } from '@/components/copier'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { Heading, Text } from '@/components/ui'
import Link from '@/components/ui/link'
import { CellType, CkbCell } from '@/gql/graphql'
import { satsToBtc } from '@/lib/btc/sats-to-btc'
import { isRgbppLockCell } from '@/lib/ckb/is-rgbpp-lock-cell'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'
import { BitcoinInput, BitcoinOutput, ScriptpubkeyType } from '@/types/graphql'

export interface BtcUtxoTablesProps {
  vin?: BitcoinInput[]
  vout?: BitcoinOutput[]
  currentAddress?: string
  ckbCell?: {
    inputs?: CkbCell[]
    outputs?: CkbCell[]
  }
  txid?: string
}

function UtxoInput({
  vin,
  currentAddress,
  ckbCell: cell,
}: {
  vin: BitcoinInput
  currentAddress?: string
  ckbCell?: CkbCell
}): JSX.Element {
  const { lang } = useParams()
  console.log('lang', lang)
  const text = useMemo(() => {
    if (vin.isCoinbase)
      return (
        <Text fontSize="14px" fontWeight="semibold">
          <Trans>Coinbase</Trans>
        </Text>
      )
    if (!vin.prevout) return null
    const formattedAddress = (
      <IfBreakpoint breakpoint="sm" fallback={truncateMiddle(String(vin.prevout.address ?? ''), 6, 6)}>
        {truncateMiddle(String(vin.prevout.address ?? ''), 10, 10)}
      </IfBreakpoint>
    )
    return (
      <Copier onlyIcon value={vin.prevout.address ? String(vin.prevout.address) : undefined}>
        {currentAddress === vin.prevout.address ? (
          <Text as="span" color="text.primary">
            {formattedAddress}
          </Text>
        ) : vin.prevout.address ? (
          <Link href={`/${lang}/address/${vin.prevout.address}`} color="brand" fontSize="14px">
            {formattedAddress}
          </Link>
        ) : (
          <Text as="span" color="text.primary">
            {formattedAddress}
          </Text>
        )}
      </Copier>
    )
  }, [vin, currentAddress, lang])

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      h="60px"
      alignItems="center"
      borderBottom="1px solid"
      borderBottomColor="border.primary"
    >
      <HStack gap="8px">
        <SubTractIcon
          color={vin.isCoinbase ? 'text.third' : 'success.unspent'}
          w="16px"
          h="16px"
        />
        {text}
      </HStack>
      <VStack gap={0} textAlign="right" alignItems="right">
        <Box>
          {formatNumber(satsToBtc(vin.prevout?.value ?? '0'))}{' '}
          <Text as="span" fontSize="12px" color="text.third">
            <Trans>BTC</Trans>
          </Text>
        </Box>
        {cell ? (
          <>
            {cell.xudtInfo ? (
              <Box>
                {formatNumber(Number(cell.xudtInfo.amount), Number(cell.xudtInfo.decimal))}{' '}
                <Text as="span" fontSize="12px" color="text.third">
                  {cell.xudtInfo.symbol}
                </Text>
              </Box>
            ) : null}
            {cell.cellType === CellType.Dob || cell.cellType === CellType.Mnft ? (
              <Box>
                1
                <Text as="span" fontSize="12px" color="text.third" ml="4px">
                  <Trans>DOB</Trans>
                </Text>
              </Box>
            ) : null}
          </>
        ) : null}
      </VStack>
    </Flex>
  )
}

function UtxoOutput({
  vout,
  currentAddress,
  ckbCell: cell,
}: {
  vout: BitcoinOutput
  ckbCell?: CkbCell
  currentAddress?: string
}): JSX.Element {
  const { lang } = useParams()
  const formattedAddress = (
    <IfBreakpoint breakpoint="sm" fallback={truncateMiddle(String(vout.address ?? ''), 6, 6)}>
      {truncateMiddle(String(vout.address ?? ''), 10, 10)}
    </IfBreakpoint>
  )
  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      h="60px"
      alignItems="center"
      borderBottom="1px solid"
      borderBottomColor="border.primary"
    >
      <HStack gap="8px">
        <SubTractIcon
          color={vout.spent || vout.scriptpubkey_type === ScriptpubkeyType.OpReturn ? 'text.third' : 'success.unspent'}
          w="16px"
          h="16px"
        />
        {vout.scriptpubkey_type === ScriptpubkeyType.OpReturn ? (
          <Trans>OP_RETURN</Trans>
        ) : (
          <Copier onlyIcon value={vout.address ? String(vout.address) : undefined}>
            {currentAddress === vout.address ? (
              <Text as="span" color="text.primary">
                {formattedAddress}
              </Text>
            ) : vout.address ? (
              <Link href={`/${lang}/address/${vout.address}`} color="brand" fontSize="14px">
                {formattedAddress}
              </Link>
            ) : (
              <Text as="span" color="text.primary">
                {formattedAddress}
              </Text>
            )}
          </Copier>
        )}
      </HStack>
      <VStack gap={0} textAlign="right" alignItems="right">
        <Box>
          {formatNumber(satsToBtc(vout.value))}{' '}
          <Text as="span" fontSize="12px" color="text.third">
            <Trans>BTC</Trans>
          </Text>
        </Box>
        {cell ? (
          <>
            {cell.xudtInfo ? (
              <Box>
                {formatNumber(Number(cell.xudtInfo.amount), Number(cell.xudtInfo.decimal))}{' '}
                <Text as="span" fontSize="12px" color="text.third">
                  {cell.xudtInfo.symbol}
                </Text>
              </Box>
            ) : null}
            {cell.cellType === CellType.Dob || cell.cellType === CellType.Mnft ? (
              <Box>
                1
                <Text as="span" fontSize="12px" color="text.third" ml="4px">
                  <Trans>DOB</Trans>
                </Text>
              </Box>
            ) : null}
          </>
        ) : null}
      </VStack>
    </Flex>
  )
}

export function BtcUtxoTables({ txid, vin = [], vout = [], currentAddress, ckbCell }: BtcUtxoTablesProps): JSX.Element {
  return (
    <Grid
      w="100%"
      gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
      gap={{ base: '20px', lg: '38px' }}
      pt="10px"
      pb="20px"
      px={{ base: '20px', xl: '30px' }}
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
          <Trans>Inputs ({vin.length})</Trans>
        </Heading>
        {vin.map((input, i) => {
          const bindingCkbCell = ckbCell?.inputs?.find((cell: CkbCell) => {
            if (!isRgbppLockCell(cell)) return false
            const { btcTxid, outIndex } = parseRgbppLockArgs(cell.lock.args)
            return !(btcTxid !== input.txid || input.vout !== outIndex)
          })
          return <UtxoInput vin={input} key={i} currentAddress={currentAddress} ckbCell={bindingCkbCell} />
        })}
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
          <Trans>Outputs ({vout.length})</Trans>
        </Heading>
        {vout.map((output, i) => {
          const bindingCkbCell = ckbCell?.outputs?.find((cell: CkbCell) => {
            if (!isRgbppLockCell(cell)) return false
            const { btcTxid, outIndex } = parseRgbppLockArgs(cell.lock.args)
            return !(btcTxid !== txid || i !== outIndex)
          })
          return (
            <UtxoOutput
              ckbCell={bindingCkbCell}
              vout={output}
              key={i}
              currentAddress={currentAddress}
            />
          )
        })}
      </VStack>
    </Grid>
  )
}
