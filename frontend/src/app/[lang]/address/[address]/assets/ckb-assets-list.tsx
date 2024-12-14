'use client'

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
      icon: 'https://xudtlogos.cc/logos/Seal-logo.png',
      name: 'Seal',
      symbol: 'Seal',
      amout: '123.3123',
      value: '123123',
      typeHash: '0x178fb47b597a56d48b549226aff59f750b4784250c7f40f781b64ef090a8a0a7',
    },
    {
      icon: 'https://xudtlogos.cc/logos/Seal-logo.png',
      name: 'Seal',
      amout: '123.3123',
      symbol: 'Seal',
      value: '123123',
      typeHash: '0x178fb47b597a56d48b549226aff59f750b4784250c7f40f781b64ef090a8a0a7',
    },
    {
      icon: 'https://xudtlogos.cc/logos/Seal-logo.png',

      name: 'Seal',
      symbol: 'Seal',
      amout: '123.3123',
      value: '123123',
      typeHash: '0x178fb47b597a56d48b549226aff59f750b4784250c7f40f781b64ef090a8a0a7',
    },
    {
      icon: 'https://xudtlogos.cc/logos/Seal-logo.png',
      symbol: 'Seal',
      name: 'Seal',
      amout: '123.3123',
      value: '123123',
      typeHash: '0x178fb47b597a56d48b549226aff59f750b4784250c7f40f781b64ef090a8a0a7',
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
            <Tabs.Trigger value="Coins">Coins</Tabs.Trigger>
            <Tabs.Trigger value="Dobs">Dobs</Tabs.Trigger>
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
