'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { memo, useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'

import { AppTooltip } from '@/components/app-tooltip'
import { TIME_TEMPLATE } from '@/constants'

dayjs.extend(relativeTime)

export const AgoTimeFormatter = memo<{ time: string | number; tooltip?: boolean }>(function Time({
  time: rawTime,
  tooltip = false,
}) {
  const time = useMemo(() => dayjs(rawTime), [rawTime])
  const { i18n } = useLingui()
  const timeAgo = () => {
    const now = dayjs()
    const secondsDiff = now.diff(time, 'second')
    const minutesDiff = now.diff(time, 'minute')
    if (minutesDiff < 1) {
      return t(i18n)`${secondsDiff}s ago`
    } else if (minutesDiff < 60) {
      const remainingSeconds = secondsDiff - minutesDiff * 60
      if (remainingSeconds > 0) {
        return t(i18n)`${minutesDiff}m ${remainingSeconds}s ago`
      }
      return t(i18n)`${minutesDiff}m ago`
    } else if (minutesDiff < 1440) {
      const hoursDiff = Math.floor(minutesDiff / 60)
      const remainingMinutes = minutesDiff - hoursDiff * 60
      if (remainingMinutes > 0) {
        return t(i18n)`${hoursDiff}h ${remainingMinutes}m ago`
      }
      return t(i18n)`${hoursDiff}h ago`
    }
    return time.from(now)
  }
  const [text, setText] = useState(timeAgo())
  useInterval(() => setText(timeAgo()), 1000)

  if (!tooltip) {
    return <>{text}</>
  }

  return (
    <AppTooltip
      trigger={text}
      content={time.format(TIME_TEMPLATE)}
    />
  )
})
