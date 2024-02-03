import SuccessCheckMark from "@/app/_assets/SuccessCheckMark"
import { Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { SubmitButton } from "./Inputs"



export default function SuccessDisplay({
  show,
  text,
}: {
  show: boolean
  text: string
}) {
  if (!show) return null
  return (
    <Flex
      gap={{ base: "4rem" }}
      flexDir="column"
      alignItems="center"
      textAlign="center"
    >
      <SuccessCheckMark />
      <Text maxW="34rem" color="gray.400" fontSize="1.6rem">
        {text}
      </Text>
      <SubmitButton type="submit" href="/login" as={Link} alignSelf="stretch">
        Login
      </SubmitButton>
    </Flex>
  )
}