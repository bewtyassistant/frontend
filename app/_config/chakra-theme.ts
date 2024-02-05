
import { extendTheme } from "@chakra-ui/react"
import Button from "./chakra-components/Button"
import * as customComponents from "./custom-chakra-components"
import Input from "./chakra-components/Input"
import Heading from "./chakra-components/Heading"

const colors = {
  white: {
    main: "#FFFFFF",
    100: "#F1F1F1",
    200: "#F4F4F4",
    300: "#F8F8F8",
    400: "#F9F9F9",
    500: "#EEEEEE",
    600: "#E5E5E5",

  },
  brand: {
    main: "#BA2762",
    500: "#BA2762",
    300: "#F4AFB4",
    200: "#FFE3E7",
    10: "#3A86FF1A",
    25: "#3A86FF40",
    50: "#3A86FF80",
    100: "#5DB8EA",
  },
  green: {
    main: "#009A49",
    50: "#49C3A733",
  },
  red: {
    main: "#D02E2E",
    50: "#FF00004D"
  },
  dark: {
    100: "#151312",
    200: "#D9D9D9",
    300: "#5C5F62"
  },
  gray: {
    300: "#D6D8DC",
    400: "#9FA3AD"
  }
}

const fonts = {
  body: "'Petrona', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
  heading: "'Petrona', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
}

const fontSizes = {
  xs: "0.4rem",
  sm: "0.8rem",
  md: "1.2rem",
  lg: "1.6rem",
  xl: "2rem",
  "2xl": "2.4rem",
  "3xl": "2.8rem",
  "4xl": "3.2rem",
  "5xl": "3.6rem",
  "6xl": "4rem",
  "7xl": "4.4rem",
  "8xl": "5.2rem",
  "9xl": "5.6rem",
  "xxl": "6rem",
}

const breakpoints = {
  base: "0em",
  sm: "40em",
  md: "62em",
  lg: "74em",
  xl: "86em",
  "2xl": "104em",
}

const theme = extendTheme({ 
  colors, 
  fonts,
  fontSizes,
  breakpoints,
  components: {
    Heading,
    Input,
    Button,
    ...customComponents
  }
})

export default theme