import { Text, TextProps } from "@chakra-ui/react"

export function ErrorTextDisplay({
  show,
  children,
  ...rest
}: TextProps & { show: boolean }) {
  if (!show) return null
  return (
    <Text
      mt=".3rem"
      textAlign="center"
      color="red.main"
      fontSize="1.6rem"
      {...rest}
    >
      {children}
    </Text>
  )
}
