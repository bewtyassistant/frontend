import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { inputAnatomy } from "@chakra-ui/anatomy"


const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    borderRadius: "1.2rem",
    border: "1px solid",
    borderColor: "gray.100",
    fontSize: "1.6rem",
    lineHeight: "150%",
    color: "black",
    height: "unset",
    backgroundColor: "transparent",
    py: { base: "1.4rem", md: "2rem" },
    px: { base: "1.6rem", md: "2rem" },
    _placeholder: {
      color: "gray.100"
    },
    _focus: {
      boxShadow: "none",
      outline: "none"
    },
  },
  addon: {
    _hover: {
      bg: "white.500",
    },
    height: "unset",
    border: "1px",
    borderStyle: "solid",
    borderColor: "gray.100",
    borderRadius: "1rem",
    borderLeft: "0px",
    bg: "transparent",
  },
})

const filledInput = definePartsStyle({
  field: {
    bg: "white.300",
    border: "1px solid",
    borderColor: "gray.100",
    py: { base: "1.4rem", md: "2rem" },
    px: { base: "2rem", md: "2.7rem" },
    _hover: {
      background: "white.500"
    },
    _placeholder: {
      fontSize: "1.6rem",
      lineHeight: "150%"
    },
    _focus: {
      borderColor: "brand.main"
    },
  },
  addon: {
    _hover: {
      bg: "white.500",
    },
    height: "unset",
    border: "1px",
    borderStyle: "solid",
    borderColor: "gray.100",
    borderRadius: "1rem",
    borderLeft: "0px",
    bg: "white.300",
  },
})

const Input = defineMultiStyleConfig({
  baseStyle,
  variants: {
    filled: filledInput,
    base: baseStyle
  },
  defaultProps: {
    variant: "base"
  }
})

export default Input
