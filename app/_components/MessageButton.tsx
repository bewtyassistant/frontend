import { IconButton, Button } from "@chakra-ui/react"
import MessageIcon from "../_assets/MessageIcon"

export default function MessageButton() {
  return (
    <IconButton
      aria-label="messages"
      as={Button}
      p={{ base: "0", md: "1.6rem" }}
      borderRadius="5.2rem"
      bg={{ base: "transparent", md: "white" }}
      color="brand.main"
      _hover={{ bg: "brand.400" }}
      h="5.2rem"
    >
      <MessageIcon />
    </IconButton>
  )
}
