import Eye from "@/app/_assets/Eye"
import {
  Box,
  Button,
  ButtonProps,
  InputProps,
  InputRightAddon,
  LinkProps,
  PinInput,
  PinInputField,
  PinInputFieldProps,
  PinInputProps,
  Text,
} from "@chakra-ui/react"
import { InputGroup, FormLabel, Input } from "@chakra-ui/react"
import { ReactNode, useMemo, useState } from "react"

export function AuthInput({
  label,
  inputProps,
  inputLeftAddon,
  inputRightAddon,
  hasError,
  errorDescription,
}: {
  label: string
  inputProps: InputProps
  inputRightAddon?: ReactNode
  inputLeftAddon?: ReactNode
  hasError?: boolean
  errorDescription?: string
}) {
  const { ...otherInputProps } = inputProps

  const inputGroupProps = {
    _focus: {
      boxShadow: "none",
      outline: "none",
    },
    _focusWithin: {
      outline: "0px",
      boxShadow: "none",
      borderColor: "dark.100",
    },
  }
  return (
    <Box flexDir="column" w="full" maxW="40rem">
      <FormLabel
        fontWeight="600"
        color="dark.100"
        fontSize="1.4rem"
        lineHeight="normal"
        htmlFor={otherInputProps.id}
      >
        {label}
      </FormLabel>
      <InputGroup
        {...inputGroupProps}
        border="1px solid"
        borderColor="transparent"
      >
        {inputLeftAddon}
        <Input
          borderColor="gray.300"
          _placeholder={{ color: "gray.300" }}
          fontSize="1.6rem"
          lineHeight="normal"
          rounded=".2rem"
          px="1.6rem"
          py="1.1rem"
          color="dark.100"
          {...otherInputProps}
        />
        {inputRightAddon}
      </InputGroup>
      {hasError && (
        <Text color="red.main" fontSize="1.2rem">
          {errorDescription}
        </Text>
      )}
    </Box>
  )
}

export function SubmitButton({
  children,
  variant,
  ...props
}: ButtonProps & LinkProps) {
  return (
    <Button variant={variant || "filled"} {...props}>
      {children}
    </Button>
  )
}

export function PasswordInput({
  label,
  inputProps,
  errorDescription,
  hasError
}: {
  label: string
  inputProps: InputProps
  errorDescription: string
  hasError?: boolean
}) {
  const { type, ...rest } = inputProps
  const [showPassword, setShowPassword] = useState(false)
  return (
    <AuthInput
      label={label}
      inputProps={{
        ...rest,
        type: showPassword ? "text" : type,
        placeholder: "**********",
        borderRight: 0,
      }}
      hasError={hasError}
      errorDescription={errorDescription}
      inputRightAddon={
        <InputRightAddon
          borderRadius="inherit"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <Eye />
        </InputRightAddon>
      }
    />
  )
}

interface CustomPinInputProps extends PinInputProps {
  children: undefined
}
export function CustomPinInput({
  pinInputFieldProps,
  pinInputProps,
  fieldsCount,
}: {
  pinInputProps: CustomPinInputProps
  pinInputFieldProps: PinInputFieldProps
  fieldsCount: number
}) {
  const fieldsArray = useMemo(
    () => new Array(fieldsCount).fill(null).map((_, idx) => idx),
    [fieldsCount]
  )
  return (
    <PinInput placeholder="" focusBorderColor="brand.400" {...pinInputProps}>
      {fieldsArray.map((field) => (
        <PinInputField
          key={field}
          w={{ base: "3.9rem", lg: "5.2rem" }}
          h={{ base: "3.9rem", lg: "5.2rem" }}
          rounded="none"
          fontSize={{ base: "1.2rem", md: "1.4rem", lg: "1.6rem" }}
          {...pinInputFieldProps}
        />
      ))}
    </PinInput>
  )
}
