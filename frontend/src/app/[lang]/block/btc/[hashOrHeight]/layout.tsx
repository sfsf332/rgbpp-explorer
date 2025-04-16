'use client'
// import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { VStack } from 'styled-system/jsx'

// import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
// import { BlockHeader } from '@/components/block-header'
import { BtcBlockOverview } from '@/components/btc/btc-block-overview'
import { LinkTabs } from '@/components/link-tabs'
// import { graphql } from '@/gql'
// import { BitcoinBlock } from '@/gql/graphql'
import { useBlockInfo } from '@/hooks/useRgbppData'


export default  function Layout({
  params: { hashOrHeight },
  children,
}: PropsWithChildren<{ params: { hashOrHeight: string; lang: string } }>) {

  const { data ,isLoading,error} = useBlockInfo('BTC', hashOrHeight)
  console.log(data)
  if (error) notFound()

  return (
    <VStack w="100%" maxW="content" p={{ base: '20px', lg: '30px' }} gap={{ base: '20px', lg: '30px' }}>
       {/* {!isLoading&&data?
      (<BlockHeader
        id={data.hash}
        height={data.height}
      />
      ):null} */}
      <BtcBlockOverview  block={data } />
      <LinkTabs
        w="100%"
        links={[
          {
            href: `/block/btc/${hashOrHeight}/transactions`,
            label: <Trans>Transactions</Trans>,
          },
        ]}
      />
      {children}
    </VStack>
  )
}
