"use client"
import { Flex } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"

export default function ForgotPassword() {
  return (
    <AuthLayout
      headingText="Forgot your password?"
      subHeadingText="Enter your email address and we&apos;ll send you a reset code"
    >
      <Flex alignItems="stretch" w="full" maxW="40rem" gap="8rem" flexDir="column">
        <Flex flexDir="column" gap="2.4rem">
          <AuthInput
            label={"Email"}
            inputProps={{ placeholder: "example@email.com" }}
          />
        </Flex>
        <SubmitButton>Send reset code</SubmitButton>
      </Flex>
    </AuthLayout>
  )
}
