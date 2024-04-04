import { defineStyleConfig } from "@chakra-ui/react"
const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
    h: "unset",
    borderRadius: ".4rem",
    px: "1.6rem",
    py: "2rem",
  },
  sizes: {
    sm: {
      fontSize: "1.6rem",
    },
    md: {
      fontSize: "1.9rem",
    },
  },
  variants: {
    filled: {
      color: "white.main",
      background: "brand.main",
      h: "unset",
      _hover: { backgroundColor: "brand.400", color: "brand.main" },
      _active: { backgroundColor: "brand.200", color: "brand.main" },
      borderRadius: ".4rem",
      px: "1.6rem",
      py: "1.8rem",
    },
    transparent: {
      h: "unset",
      _hover: { backgroundColor: "brand.400", color: "brand.main" },
      _active: { backgroundColor: "brand.200", color: "brand.main" },
      borderRadius: ".4rem",
      px: "1.6rem",
      py: "2rem",
      borderColor: "brand.main",
      border: "1px solid",
      color: "brand.main",
    },
  },
  defaultProps: {
    size: "sm",
  },
})

export default Button
