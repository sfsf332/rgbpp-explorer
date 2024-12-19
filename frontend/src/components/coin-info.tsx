'use client'

import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import BigNumber from 'bignumber.js'
import { Box, Flex, Grid,styled } from 'styled-system/jsx'

import { Copier } from '@/components/copier'
import { Loading } from '@/components/loading'
import { Text } from '@/components/ui'
import { XudtLogoLoader } from '@/components/xudt-logo-loader'
import { useAssetInfo } from '@/hooks/useRgbppData'
import { formatBigNumber, formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

export function CoinInfo({ typeHash }: { typeHash: string }) {

  const { i18n } = useLingui()
  const lang = i18n.locale

  const { assetInfo, assetQuote } = useAssetInfo(typeHash)
  if (!assetInfo || !assetQuote) {
    return <Loading />
  }

  return (
    <Grid
      gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
      columnGap="20px"
      rowGap="20px"
      w="100%"
      maxW="content"
      p={{ base: '20px', lg: '30px' }}
      bg="bg.card"
      rounded="8px"
    >
      <Flex flexDirection="row" gap="16px" id="info" alignItems="center">
        <Box w="120px" h="120px" gridRow={{ base: '1/2', md: '1/3' }}>
          {assetInfo.icon ? (
            <styled.img w="100%" h="100%" src={assetInfo.icon} rounded="100%" />
          ) : (
            <XudtLogoLoader
              symbol={assetInfo.symbol || assetInfo.name || ''}
              size={{ width: '120px', height: '120px', fontSize: '48px' }}
            />
          )}
        </Box>
        <Flex flexDirection="column" gap="12px">
          <Flex gap="12px" alignItems="center">
            <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="600" lineHeight="1">
              {assetInfo.symbol}
            </Text>
            <Text color="text.third">{assetInfo.name}</Text>
          </Flex>
          <Flex gap="12px" alignItems="center">
            <Text fontSize="14px" color="text.secondary" lineHeight="24px" wordBreak="keep-all">
              <Trans>Contract:</Trans>
            </Text>
            <Copier value={typeHash}>
              <Text fontSize="14px" color="text.secondary" lineHeight="24px" wordBreak="break-all">
                {truncateMiddle(typeHash, 10, 8)}
              </Text>
            </Copier>
          </Flex>
          <Flex alignItems="center" gap="8px">
            <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="600" color="brand">
              <Trans>Price</Trans>: ${formatNumber(assetQuote.price)}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Grid
        id="overview"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={{ base: '16px', md: '20px' }}
        textAlign={{ base: 'left', lg: 'right' }}
      >
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>Market Cap</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            ${formatBigNumber(assetQuote.marketCap, 2, lang)}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>24H Volume</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            {formatNumber(assetQuote.volume24h)}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>Circulating Supply</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            {assetQuote.circulatingSupply ? formatNumber(new BigNumber(assetQuote.circulatingSupply?.toString())) : null}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>Total Supply</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            {assetQuote.totalSupply ? formatNumber(new BigNumber(assetQuote.totalSupply?.toString())) : null}
          </Text>
        </Flex>
      </Grid>
    </Grid>
  )
}
