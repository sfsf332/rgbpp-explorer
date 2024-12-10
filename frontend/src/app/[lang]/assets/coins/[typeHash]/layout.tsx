import { t } from '@lingui/macro'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Box, Flex, Grid, styled } from 'styled-system/jsx'

import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
import { Copier } from '@/components/copier'
import { LinkTabs } from '@/components/link-tabs'
import { Text } from '@/components/ui'
import { XudtLogoLoader } from '@/components/xudt-logo-loader'
import { graphql } from '@/gql'
import { graphQLClient } from '@/lib/graphql'
import { formatNumber } from '@/lib/string/format-number'
import { truncateMiddle } from '@/lib/string/truncate-middle'

const query = graphql(`
  query RgbppCoin($typeHash: String!) {
    rgbppCoin(typeHash: $typeHash) {
      name
      symbol
      icon
    }
  }
`)


export default async function AssetDetail({
  children,
  params: { typeHash, lang },
}: PropsWithChildren<{ params: { typeHash: string; lang: string } }>) {
  const i18n = getI18nInstance(lang)
  const response = await graphQLClient.request(query, { typeHash })
  if (!response.rgbppCoin) notFound()

  // todo 
  const testData = {
    marketCap: 0,
    volume24h: 0,
    circulatingSupply: 0,
    totalSupply: 0,
    price: 0,
  }

  return (
    <>
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
            {response.rgbppCoin.icon ? (
              <styled.img w="100%" h="100%" src={response.rgbppCoin.icon} rounded="100%" />
            ) : (
              <XudtLogoLoader
                symbol={response.rgbppCoin.symbol}
                size={{ width: '120px', height: '120px', fontSize: '80px' }}
              />
            )}
          </Box>
          <Flex flexDirection="column" gap="12px" >
            <Flex gap="12px" alignItems="center">
              <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="600" lineHeight="1">
                {response.rgbppCoin.symbol}
              </Text>
              <Text color="text.third">
                {response.rgbppCoin.name}
              </Text>
            </Flex>
            <Flex gap="12px" alignItems="center">
              <Text fontSize="14px" color="text.secondary" lineHeight="24px" wordBreak="keep-all">
                {t(i18n)`Contract:`}
              </Text>
              <Copier value={typeHash}>
                <Text fontSize="14px" color="text.secondary" lineHeight="24px" wordBreak="break-all">
                  {truncateMiddle(typeHash, 10, 8)}
                </Text>
              </Copier>
            </Flex>
            <Flex alignItems="center" gap="8px">
              <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="600" color="brand">
                {t(i18n)`Price`}: ${formatNumber(testData.price)}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Grid id="overview"
          gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: '16px', md: '20px' }}
          textAlign={{ base: 'left', lg: 'right' }}
        >
          <Flex flexDirection="column" gap="8px">
            <Text fontSize="14px" color="text.secondary">{t(i18n)`Market Cap`}</Text>
            <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
              ${formatNumber(testData.marketCap)}
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="8px">
            <Text fontSize="14px"  color="text.secondary">{t(i18n)`24H Volume`}</Text>
            <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
              {formatNumber(testData.volume24h)}
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="8px">
            <Text fontSize="14px" color="text.secondary">{t(i18n)`Circulating Supply`}</Text>
            <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
              {formatNumber(testData.circulatingSupply)}
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="8px">
            <Text fontSize="14px" color="text.secondary">{t(i18n)`Total Supply`}</Text>
            <Text fontSize={{ base: '14px', md: '18px', lg: '20px' }} fontWeight="600">
              {formatNumber(testData.totalSupply)}
            </Text>
          </Flex>
        </Grid>
      </Grid>
      <LinkTabs
        links={[
          {
            href: `/assets/coins/${typeHash}/holders`,
            label: t(i18n)`Holders`,
          },
          {
            href: `/assets/coins/${typeHash}/transactions`,
            label: t(i18n)`Transactions`,
          },
        ]}
        maxW="content"
        w="100%"
        justify="start"
      />
      {children}
    </>
  )
}
