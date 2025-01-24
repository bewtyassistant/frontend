import { Button } from "@chakra-ui/react"
import LogoutButton from "./LogoutButton"

export default function NavLogoutButton() {
  return (
    <LogoutButton>
      <Button
        as="span"
        w="40dvw"
        maxW="12.7rem"
        variant="outline"
        color={{ base: "white", md: "brand.main" }}
        borderColor="currentcolor"
        padding={{ base: "20px 0", md: "16px 0" }}
        bg={{ base: "brand.main", md: "white" }}
        borderRadius={{ base: "2.4rem", md: ".4rem" }}
        height="unset"
        _hover={{ bg: "#f4afb4", color: "brand.main" }}
      >
        Logout
      </Button>
    </LogoutButton>
  )
}
