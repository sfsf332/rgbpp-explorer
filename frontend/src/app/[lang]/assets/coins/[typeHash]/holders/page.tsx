'use client'

import { Trans } from '@lingui/macro'
import { Box, Flex, HStack,VStack } from 'styled-system/jsx'

import { CoinHolderList } from '@/components/holder-list/coin-holder-list'
import { HolderSummarySection } from '@/components/holder-list/holder-summary'
import { type GetHoldersResponse } from '@/components/holder-list/type'
import { Heading } from '@/components/ui'

// Example mock data
const mockGetHoldersResponse: GetHoldersResponse = {
  totalSupply: 10000000,
  summary: {
    totalHolders: 10,
    chainHolders: {
      btc: 3,
      ckb: 7,
      doge: 0
    }
  },
  holders: [
    { address: 'tb1plyskg643j873n6y9jz3cquv4606rq8v750awharadsear84zszxq0d3flp', chain: 'BTC', value: 210000, rank: 1 },
    { address: 'ckt1qrfrwcdnvssswdwpn3s9v8fp87emat306ctjwsm3nmlkjg8qyza2cqgqqx0ppa3gs9leysm9ertq95t2q00cljcndut62vc3', chain: 'CKB', value: 90234.56, rank: 2 },
    { address: 'DBgHW1Shjyk91fusm9hm3HcryNBwaFwZbQ', chain: 'DOGE', value: 15090.23235, rank: 3 },
    { address: 'ckt1qpyn2yx4f6q4vydxgwhe0ddvjwlmk3wac24wpukuala0xsytfl8u6q2tqqqqqyqqqqqrqqqqqqcsqqqq7v57llgugadzj7z98jrqpc027z7zpplwpy7raejve9hvdprh2t9sz9sqqqqp92a0wk5nf695m2zaklre485vtgqz9gtxqqqqqqqqqqqqqqqqqqqqqqzjkwg7qqfyzs7n', chain: 'CKB', value: 15090.23235, rank: 4 },
    { address: 'ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgj4whht2f5az6d4pwm03u6n6x95qpz59nqqqvldzsf', chain: 'CKB', value: 15090.23235, rank: 5 },
    { address: 'ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgjv3se7nm9mjen690t26r3zfccuxkwzme5qq4q85en', chain: 'CKB', value: 15090.23235, rank: 6 },
    { address: 'ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgjv3se7nm9mjen690t26r3zfccuxkwzme5qq4q85en', chain: 'CKB', value: 15090.23235, rank: 7 },
    { address: 'ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgjv3se7nm9mjen690t26r3zfccuxkwzme5qq4q85en', chain: 'CKB', value: 15090.23235, rank: 8 },
    { address: 'ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgjv3se7nm9mjen690t26r3zfccuxkwzme5qq4q85en', chain: 'CKB', value: 15090.23235, rank: 9 },
    { address: 'ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgjv3se7nm9mjen690t26r3zfccuxkwzme5qq4q85en', chain: 'CKB', value: 15090.23235, rank: 10 }
  ],
  pagination: {
    pageSize: 10,
    page: 1,
    total: 3
  }
}

export default function Page() {
  const { totalSupply, summary:holderSummary, holders } = mockGetHoldersResponse

  return (
    <VStack w="100%" maxW="content" gap="30px">
      <HolderSummarySection summary={holderSummary} />
      <Box w="100%" bg="bg.card" flexDir="column" alignItems="center" rounded="8px">
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
            <Heading fontSize="20px" fontWeight="semibold" w="100%" textAlign="left">
              <Trans>{holderSummary.totalHolders} Holders</Trans>
            </Heading>
          </HStack>
        </Flex>
        <Box p="0px">
          <CoinHolderList holders={holders} totalSupply={totalSupply} />
        </Box>
      </Box>
    </VStack>
  )
}