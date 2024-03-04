import { Box, Flex } from "@chakra-ui/react"
import SearchBox from "../SearchBox"
import NotificationButton from "../NotificationButton"
import MessageButton from "../MessageButton"
import NavLogoutButton from "../NavLogoutButton"

export default function DesktopHeaderChildren() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap="2rem"
      scale={{ md: ".4", lg: "1" }}
    >
      <Box maxW={{ md: "35rem", lg: "43.5rem" }} flexGrow="1">
        <SearchBox />
      </Box>
      <Flex gap={{ md: "3rem", lg: "5rem" }} alignItems="center">
       <NotificationButton/>
       <MessageButton />
       <NavLogoutButton/>
      </Flex>
    </Flex>
  )
}
