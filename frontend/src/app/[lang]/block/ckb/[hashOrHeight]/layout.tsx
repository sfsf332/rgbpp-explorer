'use client'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { VStack } from 'styled-system/jsx'

import { BlockHeader } from '@/components/block-header'
import { CkbBlockOverview } from '@/components/ckb/ckb-block-overview'
import { LinkTabs } from '@/components/link-tabs'
import { useBlockInfo } from '@/hooks/useRgbppData'


export default function Layout({
  params: { hashOrHeight },
  children,
}: PropsWithChildren<{
  params: { hashOrHeight: string; }
}>) {
  const { data ,isLoading,error} = useBlockInfo('CKB', hashOrHeight)
  if (error) notFound()

  return (
    <VStack w="100%" maxW="content" p={{ base: '20px', lg: '30px' }} gap={{ base: '20px', lg: '30px' }}>
     {!isLoading&&data?
      (<BlockHeader
        id={data.hash}
        height={data.height}
      />
      ):null}
      <CkbBlockOverview block={data} />
      <LinkTabs
        w="100%"
        links={[
          {
            href: `/block/ckb/${hashOrHeight}/transactions`,
            label: `Transactions`,
          },
        ]}
      />
      {children}
    </VStack>
  )
}
