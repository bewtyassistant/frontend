import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react"
import SearchIcon from "../_assets/SearchIcon"

export default function SearchBox() {
  return (
    <InputGroup
      variant="search"
      overflow="hidden"
      border="1px solid"
      borderRadius="2.4rem"
      borderColor={{ base: "brand.300", md: "transparent" }}
    >
      <InputLeftAddon>
        <SearchIcon />
      </InputLeftAddon>
      <Input placeholder="Search appointments" />
    </InputGroup>
  )
}
