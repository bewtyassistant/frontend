import { Box, Show } from "@chakra-ui/react"
import SearchBox from "../SearchBox"

export default function MobileSearchHeader() {
  return (
    <Show below="md">
      <Box position="sticky" top=".8rem" insetX="0" zIndex="100">
        <SearchBox />
      </Box>
    </Show>
  )
}
