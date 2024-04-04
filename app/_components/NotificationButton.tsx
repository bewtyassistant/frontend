import { Button, IconButton } from "@chakra-ui/react"
import BellIcon from "../_assets/BellIcon"

export default function NotificationButton() {
  return (
    <IconButton
      aria-label="notifications"
      as={Button}
      p="1.6rem"
      borderRadius="5.2rem"
      bg={{base: "brand.main", md: "white"}}
      color={{ base: "white", md: "brand.main" }}
      h="5.2rem"
      _hover={{ bg: "brand.400" }}
    >
      <BellIcon />
    </IconButton>
  )
}
