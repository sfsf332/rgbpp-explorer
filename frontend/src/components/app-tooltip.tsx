'use client'

import { ReactNode } from 'react'
import { Box } from 'styled-system/jsx'

import { Tooltip } from '@/components/ui'

export interface AppTooltipProps {
  trigger: ReactNode
  content: ReactNode
  /**
   * 是否禁用 tooltip
   * @default false
   */
  disabled?: boolean
  /**
   * 自定义定位配置
   */
  positioning?: {
    placement?: 'top' | 'right' | 'bottom' | 'left'
  }
}

export function AppTooltip({ trigger, content, disabled = false, positioning }: AppTooltipProps) {
  return (
    <Tooltip.Root openDelay={0} closeDelay={0} disabled={disabled} mobileClickable>
      <Tooltip.Trigger asChild>
        <Box display="inline-block">
          {trigger}
        </Box>
      </Tooltip.Trigger>
      <Tooltip.Positioner style={{ zIndex: 100 }}>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        <Tooltip.Content
          style={{
            backgroundColor: 'var(--colors-bg-tooltip)',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'keep-all',
            lineHeight: '20px',
          }}
        >
          {content}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
