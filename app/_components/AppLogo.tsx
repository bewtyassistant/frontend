import { Colors, Flex, ResponsiveValue } from "@chakra-ui/react";
import Logo from "../_assets/Logo";
import LogoText from "../_assets/LogoText";


export default function AppLogo({ color }: {
  color?: ResponsiveValue<string>
}){
  return (
    <Flex gap=".867rem" color={color || "white"} alignItems="center">
      <Logo/>
      <LogoText/>
    </Flex>
  )
}