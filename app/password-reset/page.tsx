"use client"
import {
  Flex,
  useToast,
} from "@chakra-ui/react"
import AuthLayout from "../_components/Auth/Layout"
import { useRouter } from "next/navigation"
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react"
import useAxios from "../_hooks/useAxios"
import PasswordResetCodeInput from "./_PasswordResetCodeInput"
import NewPasswordInput from "./_NewPasswordInput"
import SuccessDisplay from "../_components/Auth/SuccessDisplay"
import STORAGE_KEYS from "../STORAGE_KEYS"

export default function ResetPassword() {
  const router = useRouter()
  const toast = useToast({
    position: "top",
    size: "lg",
    containerStyle: {
      color: "white",
      fontSize: "1.4rem",
      fontWeight: "bold",
    },
  })
  useEffect(() => {
    // if (sessionStorage.getItem(STORAGE_KEYS.BA_USER_EMAIL) === null) {
    //   router.push("/")
    // }
  }, [router])
  const { fetchData } = useAxios()
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isValidPasswordResetCode, setIsValidPasswordResetCode] = useState<
    boolean | undefined
  >(undefined)
  const [success, setSuccess] = useState(false)
  const [fetchError, setFetchError] = useState("")
  const [passwordResetCode, setPasswordResetCode] = useState("")
  const [loading, setLoading] = useState(false)
  const headingText = useMemo(() => {
    if(isValidPasswordResetCode !== true && success === false) {
      return {
        heading: "Password reset code",
        subHeading:
          "A reset code has been sent to your mail, enter the code below to reset your password",
      }
    }else if(isValidPasswordResetCode === true && success === false){
      return {
        heading: "Change password",
        subHeading: "Enter a new password",
      }
    }else{
      return {
        heading: "Password changed successfully",
        subHeading: ""
      }
    }
  }, [isValidPasswordResetCode, success])
  
  const handleSubmitPasswordResetCode = useCallback(
    async (value: string) => {
      setLoading(true)
      let res = await fetchData({
        url: `/users/reset-password?code=${value}`,
        body: {
          email: sessionStorage.getItem(STORAGE_KEYS.BA_USER_EMAIL),
        },
        method: "post",
      })
      if (res.statusCode === 200) {
        setPasswordResetCode(value)
        setIsValidPasswordResetCode(true)
      } else {
        setIsValidPasswordResetCode(false)
        setFetchError(
          failedAttempts >=
            Number(process.env.NEXT_PUBLIC_FETCH_ERROR_THRESHOLD) - 1
            ? "Invalid code, resend code or contact support if this persists"
            : res.message
        )
        setFailedAttempts((prev) => prev + 1)
      }
      setLoading(false)
    },
    [failedAttempts, fetchData]
  )

  const handleSubmitNewPassword = useCallback(
    async (value: string) => {
      setLoading(true)
      const body = {
        email: sessionStorage.getItem(STORAGE_KEYS.BA_USER_EMAIL),
        passwordResetCode,
        newPassword: value,
      }
      let res = await fetchData({
        url: "/users/reset-password",
        body,
        method: "post",
      })
      if (res.statusCode === 200) {
        setSuccess(true)
        setPasswordResetCode("")
        setSuccess(true)
        sessionStorage.removeItem(STORAGE_KEYS.BA_USER_EMAIL)
      } else {
        toast({ status: "error", description: res.message })
        setFetchError(
          failedAttempts >=
            Number(process.env.NEXT_PUBLIC_FETCH_ERROR_THRESHOLD) - 1
            ? "Invalid code, resend code or contact support if this persists"
            : res.message
        )
        setFailedAttempts((prev) => prev + 1)
      }
      setLoading(false)
    },
    [failedAttempts, fetchData, passwordResetCode, toast]
  )

  return (
    <AuthLayout
      headingText={headingText.heading}
     // subHeadingText={headingText.subHeading}
    >
      <Flex
        alignItems="stretch"
        w="full"
        maxW="40rem"
        gap="8rem"
        flexDir="column"
        as="form"
        onSubmit={(e) => e.preventDefault()}
      >
        <PasswordResetCodeInput
          handleSubmit={handleSubmitPasswordResetCode}
          show={isValidPasswordResetCode !== true && success === false}
          hasError={isValidPasswordResetCode === false}
          loading={loading}
          submissionError={fetchError}
          resetError={() => {
            setFetchError("")
            setIsValidPasswordResetCode(undefined)
          }}
        />
        <NewPasswordInput
          handleSubmit={handleSubmitNewPassword}
          show={isValidPasswordResetCode === true && success === false}
          hasError={isValidPasswordResetCode === false}
          loading={loading}
          submissionError={fetchError}
          resetError={() => {
            setFetchError("")
          }}
        />
        
        <SuccessDisplay
          text="Password reset successful. You can now login with your new password."
          show={isValidPasswordResetCode === true && success === true}
        />
      </Flex>
    </AuthLayout>
  )
}

