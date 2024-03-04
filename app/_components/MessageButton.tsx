import { IconButton, Button } from "@chakra-ui/react";
import MessageIcon from "../_assets/MessageIcon";


export default function MessageButton(){
  return (
    <IconButton
      aria-label="messages"
      as={Button}
      p="1.6rem"
      borderRadius="5.2rem"
      bg={{ base: "brand.main", md: "white" }}
      color={{ base: "white", md: "brand.main" }}
      _hover={{ bg: "brand.400" }}
      h="5.2rem"
    >
      <MessageIcon />
    </IconButton>
  )
     
}