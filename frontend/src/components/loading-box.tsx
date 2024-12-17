import { Box } from 'styled-system/jsx'

export function LoadingBox() {
  return (
    <Box
      w="100%"
      h="100%"
      bg="border.light"
      rounded="full"
      animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    />
  )
}
