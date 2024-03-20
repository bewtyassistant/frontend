import { Colors, Flex, ResponsiveValue } from "@chakra-ui/react"
import Logo, { LogoSmall } from "../_assets/Logo"
import LogoText, { LogoTextSmall } from "../_assets/LogoText"

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

export function AppLogoSmall({
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
      <LogoSmall primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <LogoTextSmall />
    </Flex>
  )
}
