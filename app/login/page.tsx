"use client"
import { Flex, Link, Text } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"

export default function Login() {
  return (
    <AuthLayout
      headingText="Login"
      subHeadingText="Login to start using Bewty Assistant"
    >
      <Flex alignItems="stretch" w="full" maxW="40rem" flexDir="column">
        <Flex flexDir="column" gap="2.4rem">
          <AuthInput
            label={"Email"}
            inputProps={{ placeholder: "example@email.com" }}
          />
          <AuthInput
            label={"Password"}
            inputProps={{ placeholder: "**********" }}
          />
          <Link
            href="/forgot-password"
            fontSize="1.6rem"
            color={{ base: "white", lg: "brand.main" }}
          >
            Forgot password?
          </Link>
        </Flex>
        <SubmitButton>Login</SubmitButton>
        <Text
          textAlign="center"
          color={{ base: "white", lg: "gray.400" }}
          fontSize="1.6rem"
          mt=".8rem"
        >
          Don&apos;t have an account?{" "}
          <Link href="/signup" color={{ base: "white", lg: "brand.main" }}>
            Sign Up
          </Link>
        </Text>
      </Flex>
    </AuthLayout>
  )
}
