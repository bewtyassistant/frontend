import { Button } from "@chakra-ui/react";
import LogoutButton from "./LogoutButton";


export default function NavLogoutButton(){
  return (
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
  )
}