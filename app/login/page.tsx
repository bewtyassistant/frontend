"use client"
import { Flex, Link, Text } from "@chakra-ui/react"
import {
  AppInput,
  PasswordInput,
  SubmitButton,
} from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react"
import useAxios from "../_hooks/useAxios"
import { useRouter } from "next/navigation"
import localforage from "localforage"
import STORAGE_KEYS from "../STORAGE_KEYS"
import { useAppDispatch } from "../_redux/store"
import { setAuth } from "../_redux/auth.slice"
import toast from "react-hot-toast"

export default function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { fetchData } = useAxios()
  const [errors, setErrors] = useState<{ [x: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
      setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (!loginData.email || !loginData.password) {
        if (!loginData.email)
          setErrors((prev) => ({ ...prev, email: "This field is required" }))
        if (!loginData.password)
          setErrors((prev) => ({ ...prev, password: "This field is required" }))
        return
      }
      setLoading(true)
      const res = await fetchData({
        url: "/users/login",
        body: loginData,
        method: "post",
      })
      if (res.statusCode === 200) {
        toast.success(res.message || "You are logged in")
        await localforage.setItem(STORAGE_KEYS.BA_TOKEN, res.token)
        await localforage.setItem(STORAGE_KEYS.BA_USER, res.user)
        dispatch(
          setAuth({ isLoggedIn: true, token: res.token, user: res.user })
        )
        router.push(res.user.accountType === "client" ? "/client" : "/vendor")
      } else if (res.statusCode === 302) {
        toast(res.message || "Please verify your email")
        sessionStorage.setItem(STORAGE_KEYS.BA_USER_EMAIL, loginData.email)
        router.push("/verify-email")
      } else {
        toast.error(res.message || "Unable to sign you in")
      }
      setLoading(false)
    },
    [loginData, fetchData, router, dispatch]
  )

  return (
    <AuthLayout
      headingText="Login"
      subHeadingText="Login to start using Bewty Assistant"
    >
      <Flex
        alignItems="stretch"
        w="full"
        maxW="40rem"
        flexDir="column"
        as="form"
        onSubmit={handleSubmit}
      >
        <Flex flexDir="column" gap="2.4rem" mb={{ base: "2.2rem", md: "8.4rem" }}>
          <AppInput
            label={"Email"}
            inputProps={{
              placeholder: "example@email.com",
              type: "email",
              onChange: handleChange as any,
              value: loginData.email,
              name: "email",
              id: "email",
            }}
            hasError={Boolean(errors.email)}
            errorDescription={errors.email}
          />
          <PasswordInput
            label={"Password"}
            inputProps={{
              type: "password",
              onChange: handleChange as any,
              value: loginData.password,
              name: "password",
              id: "password",
            }}
            hasError={Boolean(errors.password)}
            errorDescription={errors.password}
          />
          <Link href="/forgot-password" fontSize="1.6rem" color="brand.main">
            Forgot password?
          </Link>
        </Flex>
        <SubmitButton
          type="submit"
          isLoading={loading}
          loadingText="Please wait..."
        >
          Login
        </SubmitButton>
        <Text textAlign="center" color="gray.400" fontSize="1.6rem" mt={{ base: "4.0rem", md: "3.2rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" color="brand.main">
            Sign Up
          </Link>
        </Text>
      </Flex>
    </AuthLayout>
  )
}
