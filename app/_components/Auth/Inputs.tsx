import {
  Button,
  ButtonProps,
  InputProps,
  PinInput,
  PinInputField,
  PinInputFieldProps,
  PinInputProps,
  Text,
} from "@chakra-ui/react"
import { InputGroup, FormLabel, Input } from "@chakra-ui/react"
import { ReactNode, useMemo } from "react"

export function AuthInput({
  label,
  inputProps,
}: {
  label: string
  inputProps: InputProps & { hasError?: boolean, errorDescription?: string }
}) {
  const { hasError, errorDescription, ...otherInputProps } = inputProps
  return (
    <InputGroup flexDir="column" w="full" maxW="40rem">
      <FormLabel
        fontWeight="600"
        color="dark.100"
        fontSize="1.4rem"
        lineHeight="normal"
      >
        {label}
      </FormLabel>
      <Input
        borderColor="gray.100"
        _placeholder={{ color: "gray.300" }}
        fontSize="1.6rem"
        lineHeight="normal"
        rounded=".2rem"
        px="1.6rem"
        py="1.1rem"
        color="dark.100"
        {...otherInputProps}
      />
      {hasError && <Text color="red.main" fontSize="1.2rem">{errorDescription}</Text>}
    </InputGroup>
  )
}

export function SubmitButton({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      h="unset"
      _hover={{ backgroundColor: "brand.300", color: "brand.main" }}
      _active={{ backgroundColor: "brand.200", color: "brand.main" }}
      borderRadius=".4rem"
      px="1.6rem"
      py="2rem"
      mt={{ base: "5rem", lg: "6.4rem" }}
      bg="brand.main"
      color="white"
      {...props}
    >
      {children}
    </Button>
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
    <PinInput placeholder="" focusBorderColor="brand.300">
      {fieldsArray.map((field) => (
        <PinInputField
          key={field}
          w={{ base: "2rem", md: "3rem", lg: "5.2rem" }}
          h={{ base: "2rem", md: "3rem", lg: "5.2rem" }}
          rounded="none"
          fontSize={{ base: "1.2rem", md: "1.4rem", lg: "1.6rem"}}
          {...pinInputFieldProps}
        />
      ))}
    </PinInput>
  )
}
