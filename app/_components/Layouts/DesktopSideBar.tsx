import { Box, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function DesktopSideBar({
  header,
  body,
}: {
  header: ReactNode | ReactNode[]
  body: ReactNode | ReactNode[]
}) {
  return (
    <Flex
      backgroundColor="brand.320"
      alignItems="stretch"
      minH="calc(100dvh - 8rem)"
      borderRadius=".8rem"
      flexDir="column"
      gap="2rem"
    >
      <Box
        h="10.8rem"
        borderBottom="1px solid"
        borderBottomColor="brand.200"
        pb="1.2rem"
        pt="3.2rem"
        pl="10%"
      >
        {header}
      </Box>
      <Box>{body}</Box>
    </Flex>
  )
}
