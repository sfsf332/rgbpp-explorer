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

  const { assetInfo, isLoading } = useAssetInfo(typeHash)
  if (!assetInfo || isLoading) {
    return <Loading />
  }

  const quote = assetInfo.quote;
  const info = assetInfo.info;

  const decimals = info?.decimals || 0;
  const divisor = new BigNumber(10).pow(decimals);

  const processedQuote = {
    ...quote,
    circulatingSupply: quote?.circulatingSupply
      ? new BigNumber(quote.circulatingSupply).dividedBy(divisor)
      : null,
    totalSupply: quote?.totalSupply
      ? new BigNumber(quote.totalSupply).dividedBy(divisor)
      : null,
  };

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
          {assetInfo.info?.icon ? (
            <styled.img w="100%" h="100%" src={assetInfo.info?.icon} rounded="100%" />
          ) : (
            <XudtLogoLoader
              symbol={assetInfo.info?.symbol || assetInfo.info?.name || ''}
              size={{ width: '120px', height: '120px', fontSize: '48px' }}
            />
          )}
        </Box>
        <Flex flexDirection="column" gap="12px">
          <Flex gap="12px" alignItems="center">
            <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="600" lineHeight="1">
              {assetInfo.info?.symbol}
            </Text>
            <Text color="text.third">{assetInfo.info?.name}</Text>
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
              <Trans>Price</Trans>: ${formatNumber(processedQuote?.price)}
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
          ${formatBigNumber(
              (!processedQuote?.marketCap || new BigNumber(processedQuote.marketCap).isLessThan(1)) && processedQuote?.price && processedQuote?.circulatingSupply
                ? new BigNumber(processedQuote.price).multipliedBy(processedQuote.circulatingSupply.toString())
                : processedQuote?.marketCap || '0',
              2,
              lang
            )}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>24H Volume</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            ${formatNumber(processedQuote?.volume24h)}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>Circulating Supply</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            {processedQuote?.circulatingSupply ? formatNumber(new BigNumber(processedQuote?.circulatingSupply?.toString())) : null}
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="14px" color="text.secondary">
            <Trans>Total Supply</Trans>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
            {processedQuote?.totalSupply ? formatNumber(new BigNumber(processedQuote?.totalSupply?.toString())) : null}
          </Text>
        </Flex>
      </Grid>
    </Grid>
  )
}
