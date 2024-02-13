import { Box, Button, Flex, IconButton } from "@chakra-ui/react"
import SearchBox from "../SearchBox"
import LogoutButton from "../LogoutButton"
import BellIcon from "@/app/_assets/BellIcon"
import MessageIcon from "@/app/_assets/MessageIcon"

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
        <IconButton
          aria-label="notifications"
          as={Button}
          p="1.6rem"
          borderRadius="5.2rem"
          bg="white"
          color="brand.main"
          h="5.2rem"
          _hover={{ bg: "brand.400" }}
        >
          <BellIcon />
        </IconButton>
        <IconButton
          aria-label="messages"
          as={Button}
          p="1.6rem"
          borderRadius="5.2rem"
          bg="white"
          color="brand.main"
          _hover={{ bg: "brand.400" }}
          h="5.2rem"
        >
          <MessageIcon />
        </IconButton>
        <LogoutButton>
          <Button
            as="span"
            w="40dvw"
            maxW="12.7rem"
            variant="filled"
            borderRadius="2.4rem"
          >
            Logout
          </Button>
        </LogoutButton>
      </Flex>
    </Flex>
  )
}
