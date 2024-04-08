import SuccessCheckMark from "@/app/_assets/SuccessCheckMark"
import { Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { SubmitButton } from "./Inputs"
import { ReactNode } from "react"

export default function SuccessDisplay({
  show,
  text,
  buttonText,
  buttonHref,
  onButtonClick,
}: {
  show: boolean
  text: string
  buttonText?: ReactNode
  buttonHref?: string
  onButtonClick?: () => void
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
      <SubmitButton
        type="button"
        href={buttonHref || "/login"}
        onClickCapture={(e) => {
          if (typeof onButtonClick === "function") {
            e.preventDefault()
            onButtonClick()
          }
        }}
        as={Link}
        alignSelf="stretch"
      >
        {buttonText || <>Login</>}
      </SubmitButton>
    </Flex>
  )
}
