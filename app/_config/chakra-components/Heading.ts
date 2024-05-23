import { defineStyleConfig } from "@chakra-ui/react"

const Heading = defineStyleConfig({
  baseStyle: {
    color: "black",
    fontSize: "2.4rem",
    fontStyle: "normal",
    lineHeight: "normal",
  },
  sizes: {
    base: {
      fontSize: {
        base: "1.8rem",
        md: "2.4rem"
      },
      lineHeight: "normal"
    },
    md: { 
      fontSize: { 
        base: "2.4rem",
        sm: "2.6rem",
        md: "3.2rem"
      },
      lineHeight: "normal"
    },
    large: {
      fontSize: {
        base: "3.2rem",
        md: "5rem"
      },
      lineHeight: "normal"
    },
    xl: {
      fontSize: {
        base: "4.5rem",
        md: "7.2rem"
      },
      lineHeight: "normal"
    },
  },
  defaultProps: {
    colorScheme: "brand",
    size: "base",
  },
})

export default Heading