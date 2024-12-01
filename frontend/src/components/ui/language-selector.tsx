'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePathname } from 'next/navigation'
import { styled } from 'styled-system/jsx'

import ArrowDownIcon from '@/assets/arrow-down.svg'
import { HoverCard, Text } from '@/components/ui'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
]

export function LanguageSelector() {
  const pathname = usePathname()
  const { i18n } = useLingui()
  
  // Get current language from URL
  const currentLang = pathname.split('/')[1] || 'en'

  const handleLanguageChange = (langCode: string) => {
    if (langCode === currentLang) return
    
    // Remove current locale from pathname and add new locale
    const pathSegments = pathname.split('/').filter(Boolean)
    pathSegments[0] = langCode
    const newPath = `/${pathSegments.join('/')}`
    
    // Use window.location for a full page navigation
    window.location.href = newPath
  }

  return (
    <HoverCard.Root openDelay={0} closeDelay={200} positioning={{ placement: 'top' }}>
      <HoverCard.Trigger asChild>
        <styled.button
          display="flex"
          alignItems="center"
          gap="8px"
          cursor="pointer"
          color="text.third"
          whiteSpace="nowrap"
          _hover={{ color: 'text.primary' }}
        >
          <Text>{t(i18n)`Language`}</Text>
          <ArrowDownIcon w="16px" h="16px" />
        </styled.button>
      </HoverCard.Trigger>

      <HoverCard.Positioner>
        <HoverCard.Content w="120px">
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          {languages.map(lang => (
            <styled.button
              key={lang.code}
              display="flex"
              alignItems="center"
              gap="8px"
              p="8px 12px"
              cursor="pointer"
              w="100%"
              color={lang.code === currentLang ? 'brand' : 'text.third'}
              onClick={() => handleLanguageChange(lang.code)}
              _hover={{
                color: 'text.primary',
                bg: 'bg.hover',
              }}
            >
              {lang.name}
            </styled.button>
          ))}
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  )
}
