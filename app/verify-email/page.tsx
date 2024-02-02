"use client"
import {
  Box,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react"
import {
  CustomPinInput,
  SubmitButton,
} from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"
import { FormEventHandler, useCallback, useState } from "react"
import useAxios from "../_hooks/useAxios"
import SuccessCheckMark from "../_assets/SuccessCheckMark"

export default function VerifyEmail() {
  const { fetchData } = useAxios()
  const [success, setSuccess] = useState(false)
  const [fetchError, setFetchError] = useState(!false)
  const [errorMsg, setErrorMsg] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((value: string) => {
    setVerificationCode(value)
  }, [])

  const handleSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <AuthLayout
      headingText={success ? "Verification successful" : "Verify your email"}
      subHeadingText={
        success
          ? ""
          : "A verification code has been sent to your email, enter the code below to verify your email."
      }
    >
      <Flex
        alignItems="stretch"
        w="full"
        maxW="40.5rem"
        gap="8rem"
        flexDir="column"
        as={success ? "div" : "form"}
        onSubmit={handleSubmit}
      >
        {success ? (
          <Flex
            gap={{ base: "4rem" }}
            flexDir="column"
            alignItems="center"
            textAlign="center"
          >
            <SuccessCheckMark />
            <Text maxW="34rem" color="gray.400" fontSize="1.6rem">
              You have successfully created your account, login to begin using
              Bewty Assistant
            </Text>
          </Flex>
        ) : (
          <Box>
            <Flex gap={{ base: ".5rem", lg: "2.4rem" }} justifyContent="center">
              <CustomPinInput
                fieldsCount={6}
                pinInputFieldProps={{}}
                pinInputProps={{
                  children: undefined,
                  onChange: handleChange,
                  value: verificationCode,
                  errorBorderColor: "red.main",
                  isInvalid: fetchError,
                }}
              />
            </Flex>
            {fetchError && (
              <Text
                mt=".3rem"
                textAlign="center"
                color="red.main"
                fontSize="1.6rem"
              >
                Invalid code, resend code or contact support if this persists
              </Text>
            )}
          </Box>
        )}
        <Flex
          flexDir="column"
          w="full"
          alignItems="stretch"
          mt={{ base: "5rem", lg: "6.4rem" }}
          gap="1rem"
        >
          <SubmitButton
            isLoading={loading}
            loadingText="Verifying code..."
            type="submit"
            href="/login"
            as={success ? Link : "button"}
          >
            {success ? "Login" : "Verify"}
          </SubmitButton>
          <SubmitButton type="button" variant="transparent">
            Resend code
          </SubmitButton>
        </Flex>
        {fetchError && (
          <Link
            mx="auto"
            textAlign="center"
            display="block"
            href="#"
            color="brand.main"
            fontSize="1.6rem"
          >
            Contact Support
          </Link>
        )}
      </Flex>
    </AuthLayout>
  )
}
