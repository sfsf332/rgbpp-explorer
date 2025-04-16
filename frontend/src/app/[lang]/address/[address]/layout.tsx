import { t } from '@lingui/macro'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import type { PropsWithChildren, ReactNode } from 'react'
import { Flex, HStack, VStack } from 'styled-system/jsx'

import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
// import { BtcAddressOverview } from '@/components/btc/btc-address-overview'
import { BtcAddressType } from '@/components/btc/btc-address-type'
// import { CkbAddressOverview } from '@/components/ckb/ckb-address-overview'
import { Copier } from '@/components/copier'
import { IfBreakpoint } from '@/components/if-breakpoint'
import { LinkTabs } from '@/components/link-tabs'
import { Heading, Text } from '@/components/ui'
import { isValidBTCAddress } from '@/lib/btc/is-valid-btc-address'
import { isValidCkbAddress } from '@/lib/ckb/is-valid-ckb-address'

const BtcAddressOverview = dynamic(
  () => import('@/components/btc/btc-address-overview').then((mod) => mod.BtcAddressOverview),
  { ssr: false },
)
const CkbAddressOverview = dynamic(
  () => import('@/components/ckb/ckb-address-overview').then((mod) => mod.CkbAddressOverview),
  { ssr: false },
)


export default async function Layout({
  children,
  params: { address, lang },
}: PropsWithChildren<{
  params: { address: string; lang: string }
}>) {
  const i18n = getI18nInstance(lang)
  const isBtcAddress = isValidBTCAddress(address)
  const isCkbAddress = isValidCkbAddress(address)

  if (!isBtcAddress && !isCkbAddress) notFound()
  let overflow: ReactNode = null
  if (isBtcAddress) {
    overflow = <BtcAddressOverview btcAddress={address} />
  } else if (isCkbAddress) {
    overflow = <CkbAddressOverview ckbAddress={address} />
  }
  if (!overflow) notFound()

  return (
    <VStack w="100%" maxW="content" p={{ base: '20px', xl: '30px' }} gap={{ base: '20px', xl: '30px' }}>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        w="100%"
        gap={{ base: '8px', lg: '24px' }}
        p="30px"
        bg="bg.card"
        rounded="8px"
      >
        <Heading display="flex" alignItems="center" gap="16px" fontSize="20px" height="24px" fontWeight="semibold">
          {t(i18n)`Address`}
          <IfBreakpoint breakpoint="lg" fallback={<BtcAddressType address={address} />} />
        </Heading>
        <Copier value={address}>
          <HStack maxW="calc(1160px - 100px - 24px)" minH="24px" truncate alignItems={'center'}>
            <Text as="span" wordBreak="break-all" whiteSpace="wrap" textAlign="left">
              {address}
            </Text>
            <IfBreakpoint breakpoint="lg">
              <BtcAddressType address={address} />
            </IfBreakpoint>
          </HStack>
        </Copier>
      </Flex>
      {overflow}
      <LinkTabs
        w="100%"
        links={[
          {
            href: `/${lang}/address/${address}/transactions`,
            label: t(i18n)`Transactions`,
          },
          {
            href: `/${lang}/address/${address}/assets`,
            label: t(i18n)`RGB++ Assets`,
          },
        ]}
      />
      {children}
    </VStack>
  )
}
