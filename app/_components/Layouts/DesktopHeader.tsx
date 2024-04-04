import { Box, Flex } from "@chakra-ui/react"
import AppLogo from "../AppLogo"
import { ReactNode } from "react"

export default function DesktopHeader({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Flex
      backgroundColor="brand.380"
      alignItems="center"
      justifyContent="space-between"
      minH="8rem"
      px="5.7rem"
    >
      <AppLogo defaultColor="brand.main" secondaryColor="#62BEC1" />
      <Box flexGrow="1" maxW="75%">{children}</Box>
    </Flex>
  )
}
