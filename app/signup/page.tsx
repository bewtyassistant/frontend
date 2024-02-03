"use client"
import { Flex, Link, Select, Text } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react"
import useAxios from "../_hooks/useAxios"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()
  const { fetchData } = useAxios()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [x: string]: string }>({})
  const [signupData, setSignupData] = useState({
    accountType: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =
    useCallback((e) => {
      const { name, value } = e.target
      setErrors((prev) => ({ ...prev, [name]: "", fetch: "" }))
      setSignupData((prev) => ({ ...prev, [name]: value }))
    }, [])

  const signupUser = useCallback(
    async (body: typeof signupData) => {
      try {
        return await fetchData({ url: "/users", method: "post", body })
      } catch (err) {
        return err
      }
    },
    [fetchData]
  )

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      const { accountType, email, password, confirmPassword } = signupData
      if (!password || !email || !accountType || !confirmPassword) {
        if (!password || !confirmPassword)
          setErrors((prev) => ({
            ...prev,
            password: "This field is required!",
          }))
        if (password !== confirmPassword)
          setErrors((prev) => ({
            ...prev,
            password: "Passwords not matched",
          }))
        if (!accountType)
          setErrors((prev) => ({
            ...prev,
            accountType: "This field is required!",
          }))
        if (!email)
          setErrors((prev) => ({
            ...prev,
            email: "This field is required!",
          }))
        return
      }
      setLoading(true)
      const res = await signupUser(signupData)
      if (res.statusCode === 201) {
        sessionStorage.setItem("BA_USER_EMAIL", email)
        router.push("/verify-email")
      } else {
        setErrors((prev) => ({ ...prev, fetch: res.message }))
      }
      setLoading(false)
    },
    [signupData, signupUser, router]
  )

  return (
    <AuthLayout
      headingText="Sign Up"
      subHeadingText="Create an account to start using Bewty Assistant"
    >
      <Flex
        onSubmit={handleSubmit}
        alignItems="stretch"
        w="full"
        maxW="40rem"
        flexDir="column"
        as="form"
      >
        <Text
          color="red.main"
          fontSize="1.4rem"
          fontWeight="medium"
          textAlign="center"
          mb="2rem"
        >
          {errors.fetch}
        </Text>
        <Flex flexDir="column" gap="2.4rem" mb="4rem">
          <AuthInput
            label={"Signup as"}
            inputProps={{
              placeholder: "Select account type",
              textTransform: "capitalize",
              color: signupData.accountType ? "dark.100" : "gray.300",
              name: "accountType",
              onChange: handleChange,
              as: Select,
              children: (
                <>
                  <option>client</option>
                  <option>vendor</option>
                </>
              ),
              hasError: Boolean(errors.accountType),
              errorDescription: errors.accountType,
            }}
          />
          <AuthInput
            label={"Email"}
            inputProps={{
              type: "email",
              placeholder: "**********",
              name: "email",
              onChange: handleChange,
              hasError: Boolean(errors.email),
              errorDescription: errors.email,
            }}
          />
          <AuthInput
            label={"Password"}
            inputProps={{
              type: "password",
              placeholder: "**********",
              name: "password",
              onChange: handleChange,
              hasError: Boolean(errors.password),
              errorDescription: errors.password,
            }}
          />
          <AuthInput
            label={"Re-type Password"}
            inputProps={{
              type: "password",
              placeholder: "**********",
              name: "confirmPassword",
              onChange: handleChange,
              hasError: Boolean(errors.password),
              errorDescription: errors.password,
            }}
          />
        </Flex>
        <SubmitButton
          type="submit"
          isLoading={loading}
          loadingText={"Creating your account..."}
        >
          Sign Up
        </SubmitButton>
        <Text textAlign="center" color="gray.400" fontSize="1.6rem" mt=".8rem">
          Already have an account?{" "}
          <Link href="/login" color="brand.main">
            Sign In
          </Link>
        </Text>
        <Text
          fontWeight="500"
          mt={{ base: "6rem", lg: "8rem" }}
          textAlign="center"
        >
          By creating an account, you are agreeing to our
          <Link href="#" color="brand.main">
            {" "}
            terms of service
          </Link>{" "}
          and privacy {" "}
          <Link href="#" color="brand.main">
            policy
          </Link>
          .
        </Text>
      </Flex>
    </AuthLayout>
  )
}
