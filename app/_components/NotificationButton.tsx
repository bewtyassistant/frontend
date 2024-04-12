import { Button, IconButton } from "@chakra-ui/react"
import BellIcon from "../_assets/BellIcon"

export default function NotificationButton() {
  return (
    <IconButton
      aria-label="notifications"
      as={Button}
      p={{ base: "0", md: "1.6rem" }}
      borderRadius="5.2rem"
      bg={{ base: "transparent", md: "white" }}
      color="brand.main"
      _hover={{ bg: "brand.400" }}
      h={{ md: "5.2rem" }}
    >
      <BellIcon />
    </IconButton>
  )
}
