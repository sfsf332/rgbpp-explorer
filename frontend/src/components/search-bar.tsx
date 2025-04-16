'use client'

import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { Center, Flex, type FlexProps, styled, VStack } from 'styled-system/jsx'
import { useDebounceCallback } from 'usehooks-ts'

import SearchIcon from '@/assets/search.svg'
import SearchFailedSVG from '@/assets/search-failed.svg'
import { Loading } from '@/components/loading'
import { HoverCard, Text } from '@/components/ui'
// import { graphql } from '@/gql'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { useSearchTrpc } from '@/hooks/useRgbppData'

// import { graphQLClient } from '@/lib/graphql'
import { SystemProperties } from '../../styled-system/types'

function SearchResult({
  children,
  open,
  error,
  isLoading,
  maxW = '812px',
}: {
  open: boolean
  isLoading: boolean
  error: boolean
  children: ReactNode
  maxW?: SystemProperties['maxW']
}) {
  const isMd = useBreakpoints('md')

  return (
    <HoverCard.Root open={open ? error || isLoading : false} positioning={{ placement: 'bottom', sameWidth: true }}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content maxW={maxW} pb={`${isMd && !isLoading ? '50px' : '0px'}`} zIndex={60}>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          {isLoading ? (
            <Center w="100%" h={`${isMd ? '220px' : '50px'}`}>
              <Loading />
            </Center>
          ) : (
            <VStack>
              {isMd ? <SearchFailedSVG w="200px" /> : null}
              <Text fontSize="14px" h="20px" fontWeight="medium" color="text.third">
                <Trans>Oops! Your search did not match any record.</Trans>
              </Text>
            </VStack>
          )}
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  )
}

function useSearch() {
  const router = useRouter()
  const search = useSearchTrpc('')
  return useMutation({
    async mutationFn(keyword: string) {
      const result = await search.refetch()
      if (!result.data) {
        throw new Error('Not found')
      }
      switch (result.data) {
        case 'udt':
          return router.push(`/assets/coins/${keyword}`)
        case 'ckb_transaction':
          return router.push(`/transaction/${keyword}`)
        case 'bitcoin_transaction':
          return router.push(`/transaction/${keyword}`)
        case 'bitcoin_address':
          return router.push(`/address/${keyword}`)
        case 'address':
          return router.push(`/address/${keyword}`)
        case 'block':
          return router.push(`/block/ckb/${keyword}`)
        case 'bitcoin_block':
          return router.push(`/block/btc/${keyword}`)
        default:
          throw new Error('Not found')
      }
    },
  })
}

export function SearchBar(props: FlexProps) {
  const { i18n } = useLingui()
  const { mutate, isPending, error } = useSearch()
  const [value, setValue] = useState<string>('')
  const onInput = useDebounceCallback((keyword: string) => mutate(keyword), 300)
  const [isFocus, setFocus] = useState(false)

  return (
    <SearchResult isLoading={isPending} error={!!error} open={isFocus ? !!value : false}>
      <Flex
        w="100%"
        maxW={{ base: '400px', md: '600px', lg: '812px' }}
        h={{ base: '40px', md: '56px', lg: '64px' }}
        p={{ base: '4px', lg: '6px' }}
        bg="rgba(255, 255, 255, 0.9)"
        rounded="100px"
        {...props}
      >
        <styled.input
          flex={1}
          placeholder={t(i18n)`Search by Address/Tx Hash/Block Hash/AssetID`}
          pl="20px"
          color="bg.primary"
          fontWeight="medium"
          fontSize={{ base: '16px', md: '14px', lg: '16px' }}
          _placeholder={{
            color: 'text.third',
          }}
          _focus={{ boxShadow: 'none', outline: 'none' }}
          onChange={(e) => {
            onInput(e.target.value)
            setValue(e.target.value)
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <styled.button
          bg="bg.card"
          w={{ base: '50px', md: '78px', lg: '88px' }}
          h="100%"
          rounded="full"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{ bg: 'brand' }}
        >
          <SearchIcon w={{ base: '24px', md: '32px', lg: '38px' }} h={{ base: '24px', md: '32px', lg: '38px' }} />
        </styled.button>
      </Flex>
    </SearchResult>
  )
}

export function SearchBarInNav(props: FlexProps) {
  const { i18n } = useLingui()
  const { mutate, isPending, error } = useSearch()
  const [value, setValue] = useState<string>('')
  const onInput = useDebounceCallback((keyword: string) => mutate(keyword), 300)
  const [isFocus, setFocus] = useState(false)

  return (
    <SearchResult maxW="450px" isLoading={isPending} error={!!error} open={isFocus ? !!value : false}>
      <Flex bg="bg.input" h={{ base: '32px', sm: '40px', md: '40px', lg: '44px' }} rounded="100px" w="450px" {...props}>
        <styled.input
          flex={1}
          placeholder={t(i18n)`Search by Address/Tx Hash/Block Hash/AssetID`}
          fontSize={{ base: '16px', sm: '14px' }}
          pl={{ base: '16px', lg: '20px' }}
          color="text.primary"
          fontWeight="medium"
          _placeholder={{
            color: 'text.third',
          }}
          _focus={{ boxShadow: 'none', outline: 'none' }}
          onChange={(e) => {
            onInput(e.target.value)
            setValue(e.target.value)
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <styled.button
          bg={{ base: 'transparent', sm: 'brand' }}
          color={{ base: 'brand', sm: 'text.primary' }}
          px={{ base: '8px', sm: '16px', lg: '20px' }}
          h="calc(100% - 8px)"
          rounded="full"
          cursor="pointer"
          m="4px"
        >
          <SearchIcon w="24px" h="24px" />
        </styled.button>
      </Flex>
    </SearchResult>
  )
}
