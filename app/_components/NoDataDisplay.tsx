import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import ErrorSvg from "../_assets/ErrorSvg"

export default function NoDataDisplay() {
  return (
    <>
      <VStack h="70dvh" justifyContent="center" alignItems="center">
        <Box color="brand.main" mb="2rem">
          <ErrorSvg />
        </Box>

        <Heading fontSize="3rem">Oh no!</Heading>
        <Text fontSize="1.8rem">Seems like something went wrong. </Text>
        <Text fontSize="1.4rem" opacity=".5">
          Error code: 500{" "}
        </Text>
      </VStack>
    </>
  )
}
