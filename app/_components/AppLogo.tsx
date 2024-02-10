import { Colors, Flex, ResponsiveValue } from "@chakra-ui/react"
import Logo from "../_assets/Logo"
import LogoText from "../_assets/LogoText"

export default function AppLogo({
  primaryColor,
  secondaryColor,
  defaultColor,
}: {
  primaryColor?: string
  secondaryColor?: string
  defaultColor?: ResponsiveValue<string>
}) {
  return (
    <Flex gap=".867rem" color={defaultColor || "white"} alignItems="center">
      <Logo primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <LogoText />
    </Flex>
  )
}
