import { ChangeEventHandler, useCallback, useState } from "react"
import {
  PasswordInput,
  SubmitButton,
} from "../_components/Auth/Inputs"
import { Flex } from "@chakra-ui/react"

export default function NewPasswordInput({
  show,
  handleSubmit,
  loading,
  resetError,
}: {
  hasError: boolean
  show: boolean
  handleSubmit: (value: string) => void
  loading: boolean
  submissionError: string
  resetError: () => void
}) {
  const [errorMsg, setErrorMsg] = useState("")
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  })
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNewPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      setErrorMsg("")
      resetError()
    },
    [resetError]
  )

  const handleSubmitClick = useCallback(() => {
    if (newPassword.password !== newPassword.confirmPassword)
      return setErrorMsg("Passwords do not match")
    handleSubmit(newPassword.password)
  }, [handleSubmit, newPassword.confirmPassword, newPassword.password])

  if (!show) return null
  return (
    <>
      <Flex flexDir="column" gap="2.4rem" mt="8rem">
        <PasswordInput
          label={"Password"}
          inputProps={{
            placeholder: "**********",
            value: newPassword.password,
            onChange: handleChange as any,
            name: "password",
          }}
          errorDescription={errorMsg}
          hasError={errorMsg.length > 0}
        />
        <PasswordInput
          label={"Re-type password"}
          inputProps={{
            placeholder: "**********",
            value: newPassword.confirmPassword,
            name: "confirmPassword",
            onChange: handleChange as any,
          }}
          errorDescription={errorMsg}
          hasError={errorMsg.length > 0}
        />
      </Flex>
      <SubmitButton
        onClick={handleSubmitClick}
        type="submit"
        loadingText="Please wait..."
        isLoading={loading}
      >
        Reset password
      </SubmitButton>
    </>
  )
}