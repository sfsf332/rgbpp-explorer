'use client'

import { Trans } from '@lingui/macro'
import { VStack } from 'styled-system/jsx'

import { CoinListUI } from '@/components/assets-list/coins-list'
import { ComingSoon } from '@/components/coming-soon'
import { Tabs } from '@/components/ui/tabs'

interface CoinList {
  icon?: string
  name: string
  symbol: string
  amout: string
  value: string
  typeHash: string
}
export function CKBAssetsList({ address }: { address: string }) {
  const coinList = [
    {
      icon: '',
      name: 'RGB++',
      symbol: 'RGB++',
      amout: '3315.52641025',
      value: '1665.59',
      typeHash: '0xed85cf8f30931180e3be35a5262a567a45e446f3d35d9ed6509cd218ad3b9305',
    },
    {
      icon: '',
      name: 'tBTC',
      symbol: 'tBTC',
      amout: '0.00080291',
      value: '231',
      typeHash: '0xe6396293287fefb9f26d98eb0318fe80890908f0849226ad0c8cab2d62f1e351',
    },
    {
      icon: '',
      name: 'LP-UTXOSwap V1',
      symbol: 'LP-UTXOSwap V1',
      amout: '123.3123',
      value: '123123',
      typeHash: '0x483ace62b3fc112d98813e4e028ec4ceac99842a3fc50ce9f41a028cb8b459da',
    },
    {
      icon: '',
      symbol: 'DETP',
      name: 'DETP',
      amout: '2041.2203152',
      value: '241.28',
      typeHash: '0x202afb39f963d00925fcb9b8bb9f680e56352ff3fe969104409f9a6a9730f6af',
    },
  ]
  return (
    <>
      <VStack
        w="100%"
        bg="bg.card"
        rounded="8px"
        maxW="content"
        p={{ base: '20px', xl: '30px' }}
        gap={{ base: '20px', xl: '30px' }}
      >
        <Tabs.Root variant="line" defaultValue="Coins">
          <Tabs.List>
            <Tabs.Trigger value="Coins">
              <Trans>Coins</Trans>
            </Tabs.Trigger>
            <Tabs.Trigger value="Dobs">
              <Trans>DOBs</Trans>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Coins">
            <CoinListUI coinList={coinList as CoinList[]} />
          </Tabs.Content>
          <Tabs.Content value="Dobs">
            <ComingSoon />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </>
  )
}
