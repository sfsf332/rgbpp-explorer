'use client'

import { Assign, HoverCard as ArkHoverCard, Popover as ArkPopover } from '@ark-ui/react'
import { ReactElement, ReactNode, useState } from 'react'
import { HTMLStyledProps } from 'styled-system/types'

import { HoverCard, Popover } from '@/components/ui'
import { useBreakpoints } from '@/hooks/useBreakpoints'

export interface ResponsivePopoverProps {
  trigger: ReactElement
  content: ReactNode
  contentProps?: Assign<HTMLStyledProps<'div'>, ArkHoverCard.ContentBaseProps | ArkPopover.ContentBaseProps>
  openDelay?: number
  closeDelay?: number
  positioning?: {
    placement?: 'top' | 'bottom' | 'left' | 'right'
    offset?: { mainAxis?: number; crossAxis?: number }
  }
  onOpenChange?: (details: { open: boolean }) => void
}

export function ResponsivePopover({
  trigger,
  content,
  contentProps,
  openDelay = 0,
  closeDelay = 0,
  positioning,
  onOpenChange,
}: ResponsivePopoverProps) {
  const isMd = useBreakpoints('md')
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.({ open })
  }

  const defaultContentProps = {
    outline: 'none',
    boxShadow: 'none',
    _focus: { outline: 'none', boxShadow: 'none' },
    ...contentProps,
  }

  if (isMd) {
    return (
      <HoverCard.Root
        openDelay={openDelay}
        closeDelay={closeDelay}
        positioning={positioning}
        onOpenChange={({ open }) => handleOpenChange(open)}
      >
        <HoverCard.Trigger asChild>
          {trigger}
        </HoverCard.Trigger>
        <HoverCard.Positioner>
          <HoverCard.Content {...defaultContentProps}>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            {content}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.Root>
    )
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => handleOpenChange(e.open)}>
      <Popover.Trigger asChild onClick={() => handleOpenChange(true)}>
        {trigger}
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content {...defaultContentProps}>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          {content}
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}