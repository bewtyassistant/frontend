import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import ErrorSvg from "../_assets/ErrorSvg"
import { ReactNode } from "react"

export default function NoDataDisplay({
  errorCode,
  heading,
  body,
}: {
  errorCode?: string
  heading?: ReactNode
  body?: ReactNode
}) {
  return (
    <>
      <VStack
        h="70dvh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box color="brand.main" mb="2rem">
          <ErrorSvg />
        </Box>

        <Heading fontSize="3rem">{heading || <>Oh no!</>}</Heading>
        <Text fontSize="1.8rem">
          {body || <>Seems like something went wrong.</>}
        </Text>
        {errorCode && (
          <Text fontSize="1.4rem" opacity=".5">
            Error code: {errorCode}
          </Text>
        )}
      </VStack>
    </>
  )
}
