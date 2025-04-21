'use client'

import { Trans } from '@lingui/macro'
import BigNumber from 'bignumber.js'
import { compact, sum, uniqBy } from 'lodash-es'
import { memo } from 'react'
import { Flex } from 'styled-system/jsx'

import MoneyIcon from '@/assets/money.svg'
import { shannonToCKB } from '@/lib/ckb/shannon-to-ckb'
import { formatNumber } from '@/lib/string/format-number'
import { CellType, CkbCell } from '@/types/graphql'

export const CkbOutputsSum = memo(function CkbDiffTags({ outputs = [] }: { outputs?: CkbCell[] }) {
  const outputBalanceWithoutThisAddress = sum(outputs.map((x) => x.capacity))
  const ckbDiff = shannonToCKB(BigNumber(outputBalanceWithoutThisAddress))

  // xudt
  const allXudt = uniqBy(compact(outputs.map((x) => x.udt_info)), (x) => x?.symbol)
  const xudtTags = allXudt.map((xudt) => {
    const balance = outputs
      .filter((x) => x.udt_info?.symbol === xudt?.symbol)
      .reduce((acc, x) => acc.plus(x.udt_info?.amount || 0), BigNumber(0))

    return !balance.isZero() ? (
      <Flex align="center" py="8px" fontSize="14px" lineHeight="16px" px="16px" rounded="4px" bg="brand">
        <Trans>
          {formatNumber(Number(balance), xudt?.decimal ? Number(xudt.decimal) : 0)} {xudt?.symbol}
        </Trans>
        <MoneyIcon w="16px" h="16px" ml="6px" />
      </Flex>
    ) : null
  })

  // dob
  const outputDobs = outputs.filter((x) => x.cell_type === CellType.Dob || x.cell_type === CellType.Mnft)
  const dobDiff = BigNumber(outputDobs.length)

  return (
    <>
      {!ckbDiff.isZero() ? (
        <Flex align="center" py="8px" fontSize="14px" lineHeight="16px" px="16px" rounded="4px" bg="brand">
          <Trans>{formatNumber(ckbDiff)} CKB</Trans>
          <MoneyIcon w="16px" h="16px" ml="6px" />
        </Flex>
      ) : null}
      {xudtTags}
      {!dobDiff.isZero() ? (
        <Flex align="center" py="8px" fontSize="14px" lineHeight="16px" px="16px" rounded="4px" bg="brand">
          <Trans>{formatNumber(dobDiff)} DOB</Trans>
          <MoneyIcon w="16px" h="16px" ml="6px" />
        </Flex>
      ) : null}
    </>
  )
})
