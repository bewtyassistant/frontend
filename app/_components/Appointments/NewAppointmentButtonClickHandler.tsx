import { useAppDispatch } from "@/app/_redux/store"
import { BoxProps, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { toggleShowNewAppointmentModal } from "@/app/_redux/ui.slice"

export default function NewAppointmentButtonClickHandler({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & BoxProps) {
  const dispatch = useAppDispatch()
  return (
    <Text as="span" onClick={() => dispatch(toggleShowNewAppointmentModal())} {...rest}>
      {children}
    </Text>
  )
}
