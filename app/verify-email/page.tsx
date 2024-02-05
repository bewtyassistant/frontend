"use client"
import {
  Box,
  ButtonProps,
  Flex,
  Link,
  LinkProps,
  Text,
  TextProps,
  useToast,
} from "@chakra-ui/react"
import { CustomPinInput, SubmitButton } from "../_components/Auth/Inputs"
import AuthLayout from "../_components/Auth/Layout"
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import useAxios from "../_hooks/useAxios"
import { useRouter } from "next/navigation"
import SuccessDisplay from "../_components/Auth/SuccessDisplay"
import { ErrorTextDisplay } from "../_components/Auth/ErrorText"

export default function VerifyEmail() {
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem("BA_USER_EMAIL") === null) {
      router.push("/")
    }
  }, [router])

  const toast = useToast({
    position: "top",
    size: "lg",
    containerStyle: { color: "white", fontSize: "1.4rem", fontWeight: "bold" },
  })
  const { fetchData } = useAxios()
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [success, setSuccess] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)
  const shouldDisplayError = useMemo(
    () =>
      fetchError &&
      failedAttempts >= Number(process.env.NEXT_PUBLIC_FETCH_ERROR_THRESHOLD),
    [failedAttempts, fetchError]
  )

  const handleChange = useCallback((value: string) => {
    setErrorMsg("")
    setFetchError(false)
    setVerificationCode(value)
  }, [])

  const handleResendVerificationCode = useCallback(async () => {
    setFetchError(false)
    setErrorMsg("")
    setFailedAttempts(0)
    const res = await fetchData({
      url: "/users/send-verification-email",
      method: "post",
      body: { email: sessionStorage.getItem("BA_USER_EMAIL") },
    })
    if (res.statusCode !== 200) {
      setFetchError(true)
      setErrorMsg(res.message)
    }
  }, [fetchData])

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (verificationCode.length < 6)
        return setErrorMsg("Please input verification code")
      setLoading(true)
      const body = {
        email: sessionStorage.getItem("BA_USER_EMAIL"),
        emailVerificationCode: verificationCode,
      }
      let res = await fetchData({
        url: "/users/verify-email",
        body,
        method: "post",
      })

      if (res.statusCode === 200) {
        setSuccess(true)
        setVerificationCode("")
        setFetchError(false)
        sessionStorage.removeItem("BA_USER_EMAIL")
      } else {
        setFetchError(true)
        setErrorMsg(
          failedAttempts >=
            Number(process.env.NEXT_PUBLIC_FETCH_ERROR_THRESHOLD) - 1
            ? "Invalid code, resend code or contact support if this persists"
            : res.message
        )
        setFailedAttempts((prev) => prev + 1)
      }
      setLoading(false)
    },
    [failedAttempts, fetchData, verificationCode]
  )

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
        <SuccessDisplay
          text=" You have successfully created your account, login to begin using Bewty
        Assistant"
          show={success}
        />
        <FormInput
          show={!success}
          handleChange={handleChange}
          value={verificationCode}
          isInvalid={fetchError}
          errorMsg={errorMsg}
          showErrorMsg={shouldDisplayError || errorMsg.length > 0}
        />
        <Flex
          flexDir="column"
          w="full"
          alignItems="stretch"
          mt={{ base: "5rem", lg: "6.4rem" }}
          gap="1rem"
        >
          {!success && (
            <SubmitButton
              isLoading={loading}
              loadingText="Verifying code..."
              type="submit"
            >
              Verify
            </SubmitButton>
          )}
          <ResendCodeButton
            show={shouldDisplayError}
            onClick={() => {
              toast.promise(handleResendVerificationCode(), {
                success: {
                  description:
                    "Please check your email for a verification code.",
                },
                error: {
                  description: "Something went wrong. We're working on it.",
                },
                loading: {
                  title: "Please hang on...",
                  description: "Resending code to your email",
                },
              })
            }}
          />
        </Flex>
        <SupportLink show={shouldDisplayError} />
      </Flex>
    </AuthLayout>
  )
}

function SupportLink({ show }: { show: boolean }) {
  if (!show) return null
  return (
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
  )
}

function ResendCodeButton({ show, ...rest }: ButtonProps & { show: boolean }) {
  if (!show) return null
  return (
    <SubmitButton
      type="button"
      variant="transparent"
      {...(rest as ButtonProps & LinkProps)}
    >
      Resend code
    </SubmitButton>
  )
}

function FormInput({
  show,
  handleChange,
  value,
  isInvalid,
  errorMsg,
  showErrorMsg,
}: {
  show: boolean
  handleChange: (val: string) => void
  value: string
  isInvalid?: boolean
  errorMsg: string
  showErrorMsg: boolean
}) {
  if (!show) return null
  return (
    <Box>
      <Flex gap={{ base: ".5rem", lg: "2.4rem" }} justifyContent="center">
        <CustomPinInput
          fieldsCount={6}
          pinInputFieldProps={{}}
          pinInputProps={{
            children: undefined,
            onChange: handleChange,
            value,
            errorBorderColor: "red.main",
            isInvalid,
          }}
        />
      </Flex>
      <ErrorTextDisplay show={showErrorMsg}>{errorMsg}</ErrorTextDisplay>
    </Box>
  )
}
