"use client"
import { Flex, PinInput, PinInputField } from "@chakra-ui/react"
import { AuthInput, CustomPinInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"

export default function ResetPassword() {
  return (
    <AuthLayout
      headingText="Password reset code"
      subHeadingText="A reset code has been sent to your mail, enter the code below to reset your password"
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
        <Flex flexDir="column" gap="2.4rem">
          <AuthInput
            label={"Password"}
            inputProps={{ placeholder: "**********" }}
          />
          <AuthInput
            label={"Re-type password"}
            inputProps={{ placeholder: "**********" }}
          />
          {/* headingText="Change password"
      subHeadingText="Enter a new password" */}
        </Flex>
        <SubmitButton>Send reset code</SubmitButton>
      </Flex>
    </AuthLayout>
  )
}
