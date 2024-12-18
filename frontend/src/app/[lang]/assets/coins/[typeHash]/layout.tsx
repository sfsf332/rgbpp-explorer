import { t } from '@lingui/macro'
import { PropsWithChildren } from 'react'

import { getI18nInstance } from '@/app/[lang]/appRouterI18n'
import { CoinInfo } from '@/components/coin-info'
import { LinkTabs } from '@/components/link-tabs'

export default async function AssetDetail({
  children,
  params: { typeHash, lang },
}: PropsWithChildren<{ params: { typeHash: string; lang: string } }>) {
  const i18n = getI18nInstance(lang)
  

  return (
    <>
      <CoinInfo typeHash={typeHash} />
      <LinkTabs
        links={[
          {
            href: `/assets/coins/${typeHash}/holders`,
            label: t(i18n)`Holders`,
          },
          {
            href: `/assets/coins/${typeHash}/transactions`,
            label: t(i18n)`Transactions`,
          },
        ]}
        maxW="content"
        w="100%"
        justify="start"
      />
      {children}
    </>
  )
}
