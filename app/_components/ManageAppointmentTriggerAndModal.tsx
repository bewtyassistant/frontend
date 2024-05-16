import { Button } from "@chakra-ui/react"
import Appointment from "../_types/Appointment"
import Status from "../_types/Status"

export default function ManageAppointmentTriggerAndModal({ appointment }: {
  appointment: Appointment
}) {
  return (
    <>
      <Button
        variant="filled"
        size="sm"
        padding=".75rem 1.6rem"
        fontSize={{ base: "1rem", md: "1.6rem" }}
        rounded="2.4rem"
        isDisabled={appointment.status === Status.CANCELLED}
        _hover={{
          _disabled: {
            bg: "brand.main",
            color: "white",
          },
          backgroundColor: "brand.400",
          color: "brand.main",
        }}
      >
        Manage
      </Button>
    </>
  )
}
