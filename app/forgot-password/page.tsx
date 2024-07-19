"use client"
import { Flex, useToast } from "@chakra-ui/react"
import { AppInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react"
import useAxios from "../_hooks/useAxios"
import { useRouter } from "next/navigation"
import STORAGE_KEYS from "../STORAGE_KEYS"

export default function ForgotPassword() {
  const toast = useToast({
    size: "lg",
    position: "top",
    containerStyle: { fontSize: "1.4rem", fontWeight: "bold", color: "white" },
  })
  const router = useRouter()
  const { fetchData } = useAxios()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setError(false)
      setEmail(e.target.value)
    },
    []
  )

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (!email) return setError(true)
      setLoading(true)
      const res = await fetchData({
        url: "/users/forgot-password",
        body: { email },
        method: "post",
      })
      if (res.statusCode === 200) {
        sessionStorage.setItem(STORAGE_KEYS.BA_USER_EMAIL, email)
        toast({ status: "success", description: res.message })
        router.push("/password-reset")
      } else {
        toast({
          status: "error",
          description: res.message || "Something went wrong",
        })
      }
      setLoading(false)
    },
    [email, fetchData, router, toast]
  )

  return (
    <AuthLayout
      headingText="Forgot your password?"
      subHeadingText="Enter your email address and we'll send you a reset code"
    >
      <Flex
        alignItems="stretch"
        w="full"
        maxW="40rem"
        gap="8rem"
        flexDir="column"
        as="form"
        pt="2rem"
        onSubmit={handleSubmit}
      >
        <Flex flexDir="column" gap="2.4rem">
          <AppInput
            label={"Email"}
            inputProps={{
              placeholder: "example@email.com",
              value: email,
              onChange: handleChange as any,
              type: "email",
            }}
            errorDescription="This field is required"
            hasError={error}
          />
        </Flex>
        <SubmitButton
          type="submit"
          loadingText="Sending code..."
          isLoading={loading}
        >
          Send reset code
        </SubmitButton>
      </Flex>
    </AuthLayout>
  )
}
