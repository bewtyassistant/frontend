import {
  Button,
  InputProps,
  PinInput,
  PinInputField,
  PinInputFieldProps,
  PinInputProps,
} from "@chakra-ui/react"
import { InputGroup, FormLabel, Input } from "@chakra-ui/react"
import { ReactNode, useMemo } from "react"

export function AuthInput({
  label,
  inputProps,
}: {
  label: string
  inputProps: InputProps
}) {
  return (
    <InputGroup flexDir="column" w="full" maxW="40rem">
      <FormLabel
        fontWeight="600"
        color={{ base: "white", lg: "dark.100" }}
        fontSize="1.4rem"
        lineHeight="normal"
      >
        {label}
      </FormLabel>
      <Input
        borderColor={{ base: "white", lg: "gray.100" }}
        _placeholder={{ color: { base: "#ffffffa3", lg: "gray.300" } }}
        fontSize="1.6rem"
        lineHeight="normal"
        rounded=".2rem"
        px="1.6rem"
        py="1.1rem"
        color={{ base: "white", lg: "dark.100" }}
        {...inputProps}
      />
    </InputGroup>
  )
}

export function SubmitButton({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Button
      h="unset"
      _hover={{ backgroundColor: "brand.300", color: "brand.main" }}
      _active={{ backgroundColor: "brand.200", color: "brand.main" }}
      borderRadius=".4rem"
      px="1.6rem"
      py="2rem"
      mt={{ base: "5rem", lg: "6.4rem" }}
      bg={{ base: "white", lg: "brand.main" }}
      color={{ base: "brand.main", lg: "white" }}
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
    () => new Array(fieldsCount).fill(Math.random()),
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
