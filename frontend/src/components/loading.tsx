import { Box, Center, CenterProps } from 'styled-system/jsx'

import LoadingSpritePng from '@/assets/loading-sprite.png'
import { Image } from '@/components/ui/image'

export function Loading(props: CenterProps) {
  return (
    <Center {...props}>
      <Box pos="relative" w="80px" h="80px" overflow="hidden">
        <Image
          minW="1680px"
          h="100%"
          pos="absolute"
          top="0"
          left="0"
          animation="steps-x 800ms steps(21) infinite"
          style={
            {
              '--steps-offset-x': '-1680px',
            } as any
          }
          alt="loading"
          src={LoadingSpritePng.src}
          width={LoadingSpritePng.width}
          height={LoadingSpritePng.height}
        />
      </Box>
    </Center>
  )
}
