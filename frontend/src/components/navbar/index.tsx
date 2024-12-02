'use client'

import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePathname } from 'next/navigation'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useState } from 'react'
import { Box, Center, Flex, HStack, styled, VStack } from 'styled-system/jsx'

import ArrowIcon from '@/assets/arrow.svg'
import CaretDownIcon from '@/assets/caret-down.svg'
import BtcIcon from '@/assets/chains/btc.svg'
import CkbIcon from '@/assets/chains/ckb.svg'
import LogoSVG from '@/assets/logo.svg'
import MenuIcon from '@/assets/menu.svg'
import ClientOnly from '@/components/client-only'
import { IfPathname } from '@/components/if-pathname'
import { LanguageSelector } from '@/components/language-selector'
import { NetworkSwitcher } from '@/components/network-switcher'
import { SearchBarInNav } from '@/components/search-bar'
import { Heading, HoverCard, Popover, Text } from '@/components/ui'
import { Link } from '@/components/ui/link'
import { useBreakpoints } from '@/hooks/useBreakpoints'

export function Navbar() {
  const pathname = usePathname()
  const {
    i18n: { locale },
  } = useLingui()
  const isMd = useBreakpoints('md')
  const isLg = useBreakpoints('lg')
  const [isOpen, setIsOpen] = useState(false)
  const explorers = [
    {
      label: <Trans>Bitcoin</Trans>,
      icon: <BtcIcon minW="24px" w="24px" h="24px" />,
      href: '/explorer/btc',
    },
    {
      label: <Trans>CKB</Trans>,
      icon: <CkbIcon minW="24px" w="24px" h="24px" />,
      href: '/explorer/ckb',
    },
  ]

  const getCurrentChain = () => {
    if (pathname === `/${locale}/`) return null
    return explorers.find(explorer => pathname.includes(explorer.href)) || null
  }

  const currentChain = getCurrentChain()

  const explorerLinks = explorers.map((x, i) => {
    return (
      <Link
        href={x.href}
        p={{ base: '12px', md: '6px' }}
        key={i}
        gap="8px"
        display="flex"
        alignItems="center"
        rounded="100px"
        w="100%"
        border="1px solid"
        borderColor="transparent"
        transition="100ms"
        color={currentChain?.href === x.href ? 'brand' : 'text.third'}
        _hover={{
          bg: 'bg.input',
          borderColor: 'border.light',
        }}
        css={{
          '&:hover .arrow': {
            opacity: 1,
          },
        }}
        onClick={() => setIsOpen(false)}
      >
        {x.icon}
        {x.label}
        <ArrowIcon ml="auto" mr="6px" w="12px" minW="12px" className="arrow" opacity={0} transition="100ms" />
      </Link>
    )
  })

  return (
    <Center
      flexDir="column"
      bg="bg.card"
      w="100%"
      px={{ base: '20px', lg: '30px' }}
      pos="sticky"
      top={pathname === `/${locale}` ? 0 : { base: '-48px', lg: 0 }}
      zIndex="50"
      shadow="lg"
      minH={{ base: '64px', lg: '80px' }}
    >
      <ProgressBar height="4px" color="var(--colors-brand)" options={{ showSpinner: false }} shallowRouting />
      <Flex maxW="1280px" w="100%" h={{ base: '64px', lg: '80px' }} alignItems="center" justifyContent="space-between">
        <HStack fontWeight="medium" gap={{ base: '40px', xl: '40px' }} flex={1} pr={{ base: 0, lg: '24px' }}>
          <Link display="flex" href="/" gap="8px" alignItems="center">
            <LogoSVG w="40px" h="40px" />
            <Text fontWeight="semibold" fontSize={{ base: '16px', lg: '20px' }} whiteSpace="nowrap">
              <Trans>RGB++ Explorer</Trans>
            </Text>
          </Link>
          <HStack
            gap={{ base: '24px', lg: '24px', xl: '48px' }}
            fontSize={{ base: '14px', lg: '16px' }}
            display={{ base: 'none', md: 'flex' }}
            ml={{ base: 'auto', lg: 0 }}
          >
            <HoverCard.Root unmountOnExit openDelay={0} closeDelay={200}>
              <HoverCard.Trigger asChild>
                <styled.button
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  cursor="default"
                  _hover={{ color: 'brand' }}
                  whiteSpace="nowrap"
                  rounded="8px"
                  bg="bg.input"
                  px="12px"
                  py="8px"
                >
                  {currentChain ? (
                    <>
                      {currentChain.icon}
                      {currentChain.label}
                    </>
                  ) : (
                    <Text><Trans>Chains</Trans></Text>
                  )}
                  <CaretDownIcon w="10px" h="6px" />
                </styled.button>
              </HoverCard.Trigger>

              <HoverCard.Positioner>
                <HoverCard.Content w="200px">
                  <HoverCard.Arrow>
                    <HoverCard.ArrowTip />
                  </HoverCard.Arrow>
                  <VStack gap="16px" w="100%">
                    {explorerLinks}
                  </VStack>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </HoverCard.Root>

            <Link
              href="/assets"
              _hover={{ color: 'brand' }}
              color={pathname.startsWith(`/${locale}/assets`) ? 'brand' : 'text.primary'}
              whiteSpace="nowrap"
            >
              <Trans>RGB++ Assets</Trans>
            </Link>
            <Link
              href="/charts"
              _hover={{ color: 'brand' }}
              color={pathname.startsWith(`/${locale}/charts`) ? 'brand' : 'text.primary'}
              whiteSpace="nowrap"
            >
              <Trans>Charts</Trans>
            </Link>
          </HStack>
        </HStack>
        <HStack gap="20px">
          <ClientOnly>
            <IfPathname isNotOneOf={['/']} exact>
              {isLg ? <SearchBarInNav ml="auto" /> : null}
            </IfPathname>
            
            {isMd ? <Box pl={`${isMd && !isLg ? '20px' : 'auto'}`}>
              <NetworkSwitcher />
            </Box> : null}
            
            <HStack gap="20px" pl={`${isMd && !isLg ? '0px' : 'auto'}`}>
              <LanguageSelector />
            </HStack>
            {!isMd ? (
              <Popover.Root
                open={isOpen}
                onOpenChange={(e) => setIsOpen(e.open)}
                unmountOnExit
                positioning={{ offset: { mainAxis: 24 } }}
              >
                <Popover.Trigger asChild>
                  <styled.button cursor="pointer" rounded="100%" h="100%" onClick={() => setIsOpen((x) => !x)}>
                    <MenuIcon w="16px" h="16px" color="text.primary" />
                  </styled.button>
                </Popover.Trigger>
                <Popover.Positioner w="100%" transform="translate3d(0, var(--y), 0) !important">
                  <Popover.Content
                    w="100%"
                    maxW="unset"
                    borderX="none"
                    borderBottom="none"
                    bg="bg.card"
                    rounded="0"
                    borderTop="1px solid"
                    borderTopColor="white.a2"
                  >
                    <Heading
                      h="48px"
                      lineHeight="48px"
                      fontSize="14px"
                      fontWeight="medium"
                      px="16px"
                      color={pathname.startsWith(`/${locale}/explorer`) ? 'brand' : 'text.primary'}
                    >
                      <Trans>Explorer</Trans>
                    </Heading>
                    <VStack gap="4px" w="100%" pl="24px">
                      {explorerLinks}
                    </VStack>
                    <Link
                      href="/assets"
                      h="48px"
                      lineHeight="48px"
                      fontSize="14px"
                      fontWeight="medium"
                      px="16px"
                      _hover={{ color: 'brand' }}
                      onClick={() => setIsOpen(false)}
                      color={pathname.startsWith(`/${locale}/assets`) ? 'brand' : 'text.primary'}
                    >
                      <Trans>RGB++ Assets</Trans>
                    </Link>
                    <Link
                      href="/charts"
                      h="48px"
                      lineHeight="48px"
                      fontSize="14px"
                      fontWeight="medium"
                      px="16px"
                      _hover={{ color: 'brand' }}
                      onClick={() => setIsOpen(false)}
                      color={pathname.startsWith(`/${locale}/charts`) ? 'brand' : 'text.primary'}
                    >
                      <Trans>Charts</Trans>
                    </Link>
                    <Flex
                      justifyContent="space-between"
                      w="100%"
                      py="8px"
                      alignItems="center"
                      borderTop="1px solid"
                      borderTopColor="border.primary"
                    >
                      <NetworkSwitcher/>
                    </Flex>
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            ) : null}
          </ClientOnly>
        </HStack>
      </Flex>
      <IfPathname isNotOneOf={['/']} exact>
        <Flex
          w="100%"
          maxW="1280px"
          display={{ base: 'flex', lg: 'none' }}
          h={{ base: '32px', sm: '40px', md: '40px', lg: '44px' }}
          mb={{ base: '16px', sm: '20px' }}
        >
          <ClientOnly>{!isLg ? <SearchBarInNav w="100%" /> : null}</ClientOnly>
        </Flex>
      </IfPathname>
    </Center>
  )
}
