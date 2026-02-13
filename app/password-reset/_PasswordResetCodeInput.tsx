import { Box, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRef, useState, useCallback } from "react"
import { CustomPinInput, SubmitButton } from "../_components/Auth/Inputs"
import SuccessCheckMark from "../_assets/SuccessCheckMark"
import { ErrorTextDisplay } from "../_components/Auth/ErrorText"

export default function PasswordResetCodeInput({
  hasError,
  show,
  handleSubmit,
  loading,
  submissionError,
  resetError,
}: {
  hasError: boolean
  show: boolean
  handleSubmit: (value: string) => void
  loading: boolean
  submissionError: string
  resetError: () => void
}) {
  const prevCode = useRef("")
  const [passwordResetCode, setPasswordResetCode] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const handleChange = useCallback(
    (value: string) => {
      setPasswordResetCode(value)
      setErrorMsg("")
      resetError()
    },
    [resetError]
  )

  const handleSubmitClick = useCallback(() => {
    if (prevCode.current === passwordResetCode) return
    if (passwordResetCode.length < 6)
      return setErrorMsg("This field is required!")
    handleSubmit(passwordResetCode)
    prevCode.current = passwordResetCode
  }, [passwordResetCode, handleSubmit])

  if (!show) return null
  return (
    <>
      <Box>
        <Flex
          gap={{ base: ".5rem", lg: "2.4rem" }}
          justifyContent="center"
          pt="6rem"
        >
          <CustomPinInput
            fieldsCount={6}
            pinInputFieldProps={{}}
            pinInputProps={{
              children: undefined,
              onChange: handleChange,
              errorBorderColor: "red.main",
              value: passwordResetCode,
              isInvalid:
                hasError || errorMsg.length > 0 || submissionError.length > 0,
            }}
          />
        </Flex>
        <ErrorTextDisplay
          show={hasError || errorMsg.length > 0 || submissionError.length > 0}
        >
          <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" fontSize={15}>
          {errorMsg || submissionError}
          </Text>
        </ErrorTextDisplay>
      </Box>
      <Flex flexDir="column" alignItems="stretch" w="full" gap="2rem" >
        <SubmitButton
          isLoading={loading}
          loadingText="Verifying code..."
          type="submit"
          onClick={handleSubmitClick}
        >
          Submit
        </SubmitButton>
        {hasError && (
          <SubmitButton
            variant="transparent"
            as={Link}
            href="/forgot-password"
            _focus={{ textDecor: "none" }}
          >
            Resend Code
          </SubmitButton>

          
        )}
      </Flex>
    </>
  )
}

