import { BoxProps, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function NewAppointmentButtonClickHandler({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & BoxProps) {
  return (
    <Text as="span" onClick={() => {}} {...rest}>
      {children}
    </Text>
  )
}
