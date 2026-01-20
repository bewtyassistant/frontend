import Eye from "@/app/_assets/Eye"
import EyeClosed from "@/app/_assets/EyeClosed"
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FormLabelProps,
  InputProps,
  InputRightAddon,
  LinkProps,
  PinInput,
  PinInputField,
  PinInputFieldProps,
  PinInputProps,
  SelectProps,
  Text,
} from "@chakra-ui/react"
import { InputGroup, FormLabel, Input } from "@chakra-ui/react"
import { ReactNode, useMemo, useState } from "react"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import DownChevron from "@/app/_assets/DownChevron"

export function AppFormLabel({ children, ...otherProps }: FormLabelProps) {
  return (
    <FormLabel
      fontWeight="600"
      color="dark.100"
      fontSize="1.4rem"
      lineHeight="normal"
      {...otherProps}
    >
      {children}
    </FormLabel>
  )
}
export function AppInput({
  label,
  inputProps,
  labelProps = {},
  inputLeftAddon,
  inputRightAddon,
  hasError,
  errorDescription,
  as,
  children,
  helperText,
  containerProps
}: {
  label: string
  inputProps: InputProps & SelectProps
  labelProps?: FormLabelProps
  containerProps?: BoxProps
  inputRightAddon?: ReactNode
  inputLeftAddon?: ReactNode
  hasError?: boolean
  errorDescription?: string
  as?: As
  children?: ReactNode | ReactNode[]
  helperText?: string
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
    <Box flexDir="column" w="full" maxW="40rem" {...containerProps}>
      <AppFormLabel {...labelProps} htmlFor={otherInputProps.id}>
        {label}
      </AppFormLabel>
      <InputGroup
        {...inputGroupProps}
        border="1px solid"
        borderColor={hasError ? "red" : "gray.300"}
        alignItems="center"
        px="1.3rem"
        pos="relative"
      >
        {inputLeftAddon}
        <Input
          border="0"
          _placeholder={{ color: "gray.300" }}
          fontSize="1.6rem"
          lineHeight="normal"
          rounded=".2rem"
          py="1.1rem"
          color={inputProps.value ? "dark.100" : "gray.300"}
          as={as}
          w="full"
          pos="relative"
          zIndex="2"
          bg="transparent"
          {...inputProps}
        >
          {as === "select" ? children : null}
        </Input>
        <InputRightAddon
          border="0"
          bg="transparent"
          _hover={{ bg: "transparent" }}
          pos="absolute"
          right="1.3rem"
        >
          {inputRightAddon}
        </InputRightAddon>
      </InputGroup>
      {helperText && (
        <Text mt=".8rem" color="#BABEC4" fontWeight="500">
          {helperText}
        </Text>
      )}
      {hasError && (
        <Text mt=".8rem" color="red.main" fontSize="1.2rem">
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
  revealedPlaceholder = "Hello@bewtyassistant2",
  errorDescription,
  hasError,
}: {
  label: string
  inputProps: InputProps & SelectProps
  revealedPlaceholder?: string
  errorDescription: string
  hasError?: boolean
}) {
  const { type, placeholder, ...rest } = inputProps
  const [showPassword, setShowPassword] = useState(false)
  return (
    <AppInput
      label={label}
      inputProps={{
        ...rest,
        type: showPassword ? "text" : type,
        placeholder: showPassword
          ? revealedPlaceholder
          : placeholder ?? "**********",
        borderRight: 0,
        w: "100%",
      }}
      hasError={hasError}
      errorDescription={errorDescription}
      inputRightAddon={
        <InputRightAddon
          borderRadius="inherit"
          border="0"
          _hover={{ bg: "transparent" }}
          cursor="pointer"
          zIndex="4"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye /> : <EyeClosed />}
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

export function AuthCustomSelect({
  options,
  handleSelect,
  placeholder,
  selectedOptions = [],
  placeholderProps,
}: {
  options: {
    displayValue: string
    value: any
  }[]
  handleSelect: (value: any) => void
  placeholder: any
  selectedOptions?: {
    displayValue: string
    value: any
  }[]
  placeholderProps?: BoxProps
}) {
  return (
    <Flex flexDir="column" w="full" maxW="40rem">
      <Menu closeOnSelect={false} matchWidth placement="top">
        <MenuButton
          type="button"
          border="1px solid"
          borderColor="gray.300"
          px="1.3rem"
          pos="relative"
          fontSize="1.6rem"
          lineHeight="normal"
          rounded=".2rem"
          py="1.1rem"
          color="dark.100"
        >
          <Flex
            as="span"
            justifyContent="space-between"
            alignItems="center"
            w="full"
            {...(placeholderProps || {})}
          >
            {placeholder} <DownChevron />
          </Flex>
        </MenuButton>
        <MenuList
          px="1.3rem"
          pos="relative"
          fontSize="1.6rem"
          lineHeight="normal"
          rounded=".2rem"
          py="1.1rem"
          color="dark.100"
          w="full"
          maxH="30rem"
          overflow="auto"
        >
          {options.map((option) => (
            <MenuItem
              key={option.displayValue}
              onClick={() => handleSelect(option.value)}
              bg={
                selectedOptions.some(
                  (it) => it.displayValue === option.displayValue
                )
                  ? "brand.10"
                  : ""
              }
            >
              {option.displayValue}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  )
}

export function CustomSelect({
  options,
  handleSelect,
  placeholder,
  placeholderProps,
  selectedOption,
}: {
  options: {
    displayValue: string
    value: any
  }[]
  handleSelect: (value: any) => void
  placeholder: any
  selectedOption?: {
    displayValue: string
    value: any
  }
  placeholderProps?: BoxProps
}) {
  return (
    <Flex flexDir="column" w="full" maxW="40rem">
      <Menu closeOnSelect={false} matchWidth placement="top">
        <MenuButton
          type="button"
          border="1px solid"
          borderColor="gray.300"
          px="1.3rem"
          pos="relative"
          fontSize="1.6rem"
          lineHeight="normal"
          rounded=".2rem"
          py="1.1rem"
          color="dark.100"
        >
          <Flex
            as="span"
            justifyContent="space-between"
            alignItems="center"
            w="full"
            {...(placeholderProps || {})}
          >
            {selectedOption?.value ? selectedOption.displayValue : placeholder}{" "}
            <DownChevron />
          </Flex>
        </MenuButton>
        <MenuList
          px="1.3rem"
          pos="relative"
          fontSize="1.6rem"
          lineHeight="normal"
          rounded=".2rem"
          py="1.1rem"
          color="dark.100"
          w="full"
          maxH="30rem"
          overflow="auto"
        >
          {options.map((option) => (
            <MenuItem
              key={option.displayValue}
              onClick={() => handleSelect(option)}
              bg={
                option.displayValue === selectedOption?.displayValue
                  ? "brand.10"
                  : ""
              }
            >
              {option.displayValue}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  )
}
