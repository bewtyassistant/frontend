import { Box, Flex, ResponsiveValue } from "@chakra-ui/react"
import BackButton from "../BackButton"
import { ReactNode } from "react"

export default function SubLayoutWithBackButton({
  children,
  top,
}: {
  children: ReactNode | ReactNode[]
  top?: ResponsiveValue<number | (string & {})>
}) {
  return (
    <Flex pos="relative" w="full" maxW="40rem">
      <Box
        position="absolute"
        top={top || { base: "-25%", sm: "-25%", md: "-30%" }}
        left="0"
      >
        <BackButton />
      </Box>
      {children}
    </Flex>
  )
}
