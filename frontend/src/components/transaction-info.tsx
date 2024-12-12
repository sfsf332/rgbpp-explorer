'use client'
import type { I18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { Grid, HStack, VStack } from 'styled-system/jsx'

import BtcIcon from '@/assets/chains/btc.svg'
import SpeedDropIcon from '@/assets/speed/drop.svg'
import SpeedHighIcon from '@/assets/speed/high.svg'
import SpeedLowIcon from '@/assets/speed/low.svg'
import SpeedMediumIcon from '@/assets/speed/medium.svg'
import {
  OverviewInfo,
  OverviewInfoGrid,
  OverviewInfoItem,
  OverviewInfoTagLabel,
  splitLineBefore,
} from '@/components/overview-info'
import { Heading } from '@/components/ui'
import { graphql } from '@/gql'
import { graphQLClient } from '@/lib/graphql'
import Link from '@/components/ui/link'
import { useQuery } from '@tanstack/react-query'
import { apiFetcher } from '@/services/fecthcer'
import { useLingui } from '@lingui/react'

export function TransactionInfo() {
  const { i18n } = useLingui()
  let currentPage = 1,
    sort = 'number.desc',
    type = ''
  const { data } = useQuery({
    queryKey: ['rgbpp_transactions'],
    async queryFn() {
      const response = await apiFetcher.fetchRGBTransactions(currentPage, 100, sort, type)
      if (response) {
        const { data, meta } = response
        console.log(data, meta)
        return { data, meta }
      }
      return null
    },
    refetchInterval: 10000,
  })
  console.log(data)

  return (
    <VStack gridColumn="1/3" gap="20px" bg="bg.card" p={{ base: '20px', md: '30px' }} alignItems="start" rounded="8px">
      <HStack gap="16px" display={'flex'} alignItems={'center'} justifyContent="space-between" w="100%">
        <Heading fontSize="20px" fontWeight="bold">{t(i18n)`Transactions`}</Heading>
        <Link color="text.link" href={'#'}>{t(i18n)`View Transaction Chart`}</Link>
      </HStack>
      <Grid w="100%" gridTemplateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={{ base: '20px', md: '30px' }}>
        <OverviewInfo>
          <OverviewInfoItem label={t(i18n)`Total Transactions`} formatNumber>
            {data?.meta.total}
          </OverviewInfoItem>
          <OverviewInfoItem label={t(i18n)`24H Transactions`} formatNumber>
            20000
          </OverviewInfoItem>
        </OverviewInfo>
        <OverviewInfo>
          <OverviewInfoItem label={t(i18n)`Avg. Confirmation Time`} >
            11 min
          </OverviewInfoItem>
          <OverviewInfoItem label={t(i18n)`Avg. Transaction Fee`} >
            0.0003 ckb
          </OverviewInfoItem>
        </OverviewInfo>
      </Grid>
    </VStack>
  )
}
