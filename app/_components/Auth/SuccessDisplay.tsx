import SuccessCheckMark from "@/app/_assets/SuccessCheckMark"
import { Flex, Text, Heading } from "@chakra-ui/react"
import Link from "next/link"
import { SubmitButton } from "./Inputs"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

interface SuccessDisplayProps {
  show: boolean
  text: string
  buttonText?: ReactNode
  buttonHref?: string
  onButtonClick?: () => void
}

export default function SuccessDisplay({
  show,
  text,
  buttonText,
  buttonHref,
  onButtonClick,
}: SuccessDisplayProps) {
  const router = useRouter()
  if (!show) return null

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      w="full"
      h="100%" 
      px={{ base: "2rem", md: "0" }}
      gap="3rem"
    >
      {/* Heading
      <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="medium">
        Verification successful
      </Heading> */}

     
      <SuccessCheckMark />

    
      <Text color="gray.500" fontSize={{ base: "md", md: "lg" }} maxW="28rem">
        {text}
      </Text>

      
      <SubmitButton
        as={Link}
        href={buttonHref || "/login"}
        type="button"
        variant="solid"
        colorScheme="pink" 
        
        size="lg"
        w={{ base: "full", md: "20rem" }}
        onClickCapture={(e) => {
          if (typeof onButtonClick === "function") {
            e.preventDefault()
            onButtonClick()
            if (buttonHref) router.push(buttonHref)
          }
        }}
      >
        {buttonText || "Next"}
      </SubmitButton>
    </Flex>
  )
}
