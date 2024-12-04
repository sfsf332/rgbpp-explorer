'use client'

import { Trans } from '@lingui/macro'
import { useMutation } from '@tanstack/react-query'
import { Box, type BoxProps, HStack } from 'styled-system/jsx'
import { useCopyToClipboard } from 'usehooks-ts'

import CopyIcon from '@/assets/copy.svg'
import { ResponsivePopover } from '@/components/responsive-hover-card'
import { Text } from '@/components/ui'
import { delay } from '@/lib/delay'

export interface CopierProps extends BoxProps {
  value?: string
  onlyIcon?: boolean
}

export function Copier({ value = '', children, onlyIcon = false, ...props }: CopierProps) {
  const [, copyFn] = useCopyToClipboard()
  const {
    mutateAsync: onCopy,
    isPending,
    reset,
  } = useMutation({
    async mutationFn() {
      await copyFn(value)
      await delay(3000)
    },
  })

  const handleCopy = async () => {
    await onCopy()
  }

  if (onlyIcon) {
    return (
      <HStack gap="12px" fontSize="14px" lineHeight="16px" color="text.third" {...props}>
        <Text>{children ?? value}</Text>
        <ResponsivePopover
          trigger={
            <CopyIcon
              cursor="pointer"
              w="16px"
              h="16px"
              onClick={handleCopy}
            />
          }
          content={
            <Box py="0px" color="text.primary">
              <Text fontSize="12px" lineHeight="16px">
                {isPending ? (
                  <Trans>Copied</Trans>
                ) : (
                  <Trans>Copy</Trans>
                )}
              </Text>
            </Box>
          }
          openDelay={0}
          closeDelay={0}
          positioning={{ placement: 'top' }}
          onOpenChange={async (details) => {
            if (!details.open) {
              await delay(300)
              reset()
            }
          }}
        />
      </HStack>
    )
  }

  return (
    <Box display="inline-block" cursor="pointer" onClick={handleCopy} {...props}>
      <ResponsivePopover
        trigger={
          <HStack gap="12px" fontSize="14px" lineHeight="16px" color="text.third">
            <Box>{children ?? value}</Box>
            <CopyIcon w="16px" h="16px" flexShrink={0} />
          </HStack>
        }
        content={
          <Box py="0px" color="text.primary">
            <Text fontSize="12px" lineHeight="16px">
              {isPending ? (
                <Trans>Copied</Trans>
              ) : (
                <Trans>Copy</Trans>
              )}
            </Text>
          </Box>
        }
        openDelay={0}
        closeDelay={0}
        positioning={{ placement: 'top' }}
        onOpenChange={async (details) => {
          if (!details.open) {
            await delay(300)
            reset()
          }
        }}
      />
    </Box>
  )
}