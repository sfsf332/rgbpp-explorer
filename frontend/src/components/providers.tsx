import { setI18n } from '@lingui/react/server'
import type { PropsWithChildren } from 'react'

import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
import { LinguiClientProvider } from '@/app/[lang]/LinguiClientProvider'
import { TRPCProvider } from '@/components/trpc-provider'

export function Providers({ lang, children }: { lang: string } & PropsWithChildren) {
  const i18n = getI18nInstance(lang)
  setI18n(i18n)

  return (
    <LinguiClientProvider initialLocale={lang} initialMessages={i18n.messages}>
      <TRPCProvider>
          {children}
      </TRPCProvider>
    </LinguiClientProvider>
  )
}
