'use client'

import { Trans } from '@lingui/macro'
import { Center, Flex, VStack } from 'styled-system/jsx'

import ComingSoonSVG from '@/assets/coming-soon.svg'
import { ChartProps } from '@/components/charts/types'
import { Text } from '@/components/ui'

export function ComingSoonChart({ preview = false, data = [] }: ChartProps) {
  
  if (preview) {
    return (
      <VStack gap="10px" w="100%" maxW="content" >
        <ComingSoonSVG w="140px" h="140px" />
        <Text color="text.third" fontSize="14px" marginTop="-30px">
          <Trans>Coming Soon</Trans>
        </Text>
      </VStack>
    )
  }
  
  return (
    <Center w="100%" h="100%" minH="300px" marginTop="-30px">
      <Flex
        direction="column"
        alignItems="center"
        gap="12px"
      >
        <ComingSoonSVG w="200px" h="200px" />
        <Text fontSize="16px" color="text.third" marginTop="-30px">
          <Trans>Coming soon, please stay tuned</Trans>
        </Text>
      </Flex>
    </Center>
  )
}
