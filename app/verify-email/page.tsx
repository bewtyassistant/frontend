"use client"
import { Flex, PinInput, PinInputField } from "@chakra-ui/react"
import { AuthInput, CustomPinInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"

export default function VerifyEmail() {
  return (
    <AuthLayout
      headingText="Verify your email"
      subHeadingText="A verification code has been sent to your email, enter the code below to verify your email."
    >
      <Flex
        alignItems="stretch"
       
        w="full"
        maxW="40rem"
        gap="8rem"
        flexDir="column"
      >
        <Flex gap="2.4rem" justifyContent="center">
          <CustomPinInput fieldsCount={6} pinInputFieldProps={{}} pinInputProps={{ children: undefined }}/>
        </Flex>
        <SubmitButton>Verify</SubmitButton>
      </Flex>
    </AuthLayout>
  )
}
