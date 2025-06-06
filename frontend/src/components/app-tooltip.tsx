'use client'

import { ReactNode, useState } from 'react'
import { Box } from 'styled-system/jsx'

import { Tooltip } from '@/components/ui'
import { useBreakpoints } from '@/hooks/useBreakpoints'

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
  const isMobile = !useBreakpoints('md')
  const [isOpen, setIsOpen] = useState(false)

  if (disabled) {
    return trigger
  }

  if (isMobile) {
    return (
      <Tooltip.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Tooltip.Trigger asChild onClick={() => setIsOpen(true)}>
          {trigger}
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
              zIndex: 100,
            }}
          >
            {content}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    )
  }

  return (
    <Tooltip.Root openDelay={0} closeDelay={0} disabled={disabled}>
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
            zIndex: 100,
          }}
        >
          {content}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
