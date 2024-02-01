"use client"
import { Flex, Link, Select, Text } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"

export default function Signup() {
  return (
    <AuthLayout
      headingText="Sign Up"
      subHeadingText="Create an account to start using Bewty Assistant"
    >
      <Flex alignItems="stretch" w="full" maxW="40rem" flexDir="column">
        <Flex flexDir="column" gap="2.4rem">
          <AuthInput
            label={"Signup as"}
            inputProps={{
              placeholder: "Select account type",
              // color: "gray.300",
              as: Select,
              children: (
                <>
                  <option>Client</option>
                  <option>Vendor</option>
                </>
              ),
            }}
          />
          <AuthInput
            label={"Email"}
            inputProps={{ placeholder: "**********" }}
          />
          <AuthInput
            label={"Password"}
            inputProps={{ placeholder: "**********" }}
          />
          <AuthInput
            label={"Re-type Password"}
            inputProps={{ placeholder: "**********" }}
          />
        </Flex>
        <SubmitButton>Sign Up</SubmitButton>
        <Text
          textAlign="center"
          color={{ base: "white", lg: "gray.400" }}
          fontSize="1.6rem"
          mt=".8rem"
        >
          Already have an account?{" "}
          <Link href="/login" color={{ base: "white", lg: "brand.main" }}>
            Login
          </Link>
        </Text>
      </Flex>
    </AuthLayout>
  )
}
