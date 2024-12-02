'use client'

import { usePathname } from 'next/navigation'
import { styled } from 'styled-system/jsx'

import LanguageIcon from '@/assets/language.svg'
import { ResponsivePopover } from '@/components/responsive-hover-card'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
]

export function LanguageSelector() {
  const pathname = usePathname()
  
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

  const trigger = (
    <styled.button
      display="flex"
      alignItems="center"
      gap="8px"
      cursor="pointer"
      color="text.third"
      whiteSpace="nowrap"
      _hover={{ color: 'text.primary' }}
    >
      <LanguageIcon w="22px" h="22px" />
    </styled.button>
  )

  const content = (
    <>
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
    </>
  )

  return (
    <ResponsivePopover
      positioning={{ placement: 'top' }}
      openDelay={0}
      closeDelay={200}
      contentProps={{ w: '120px' }}
      trigger={trigger}
      content={content}
    />
  )
}