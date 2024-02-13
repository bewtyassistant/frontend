import { Box, Show } from "@chakra-ui/react"
import SearchBox from "../SearchBox"

export default function MobileSearchHeader() {
  return (
    <Show below="md">
      <Box
        position="sticky"
        top="0"
        insetX="0"
        mt="3rem"
        w="90dvw"
        mx="auto"
        maxW={{lg:"43rem"}}
      >
        <SearchBox />
      </Box>
    </Show>
  )
}
