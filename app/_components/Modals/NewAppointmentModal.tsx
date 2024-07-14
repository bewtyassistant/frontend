import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppSelector } from "@/app/_redux/store"
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import AppModal from "./AppModal"
import { AppInput } from "../Auth/Inputs"
import DownChevron from "@/app/_assets/DownChevron"

export default function NewAppointmentModal() {
  const { showNewAppointmentModal } = useAppSelector((store) => store.ui)
  const toggleShowNewAppointmentModal = useToggleShowNewAppointmentModal()

  return (
    <AppModal
      isOpen={showNewAppointmentModal}
      onClose={toggleShowNewAppointmentModal}
      headerContent={<>Create a new appointment</>}
      showModalCloseButton
    >
      <Box pt="3.2rem" pb={{ base: "13rem", md: "8.8rem" }}>
        <Text
          mb="3.2rem"
          fontSize="1.6rem"
          lineHeight="112%"
          maxW="43.2rem"
          mx="auto"
        >
          Create a new appointment by providing the below information and
          we&apos;ll find you a match.
        </Text>
        <NewAppointmentForm
          handleCancel={() => toggleShowNewAppointmentModal()}
        />
      </Box>
    </AppModal>
  )
}

function NewAppointmentForm({ handleCancel}: { handleCancel: () => void}) {
  return (
    <VStack alignItems="center" gap="2rem" as="form" mx="auto" w="full">
      <AppInput
        label="Location"
        inputProps={{
          placeholder: "Enter location",
        }}
        labelProps={{ fontWeight: "400" }}
        helperText="(Enter the name of your prefered area, e.g GRA phase 1.)"
      />
      <AppInput
        label="Appointment date & time"
        inputProps={{
          placeholder: "Select date and time for appointment",
          type: "datetime-local",
        }}
        labelProps={{ fontWeight: "400" }}
      />
      <AppInput
        label="Select previously used stylist"
        inputProps={{}}
        labelProps={{ fontWeight: "400" }}
        as="select"
        inputRightAddon={<DownChevron />}
      >
        <option>Select previously used stylist</option>
        <option>Vendor 1</option>
      </AppInput>
      <AppInput
        label="Products to be used"
        inputProps={{}}
        labelProps={{ fontWeight: "400" }}
        as="select"
        inputRightAddon={<DownChevron />}
      >
        <option>Select products to be used</option>
        <option>Salon products</option>
        <option>Own products</option>
        <option>Own & Salon products</option>
      </AppInput>
      <AppInput
        label="Note of importance"
        inputProps={{
          placeholder: "Write Something note worthy...",
          type: "text",
          height: "16.6rem",
          resize: "none",
        }}
        labelProps={{ fontWeight: "400" }}
        as="textarea"
        helperText="(Say something you'd like us to take note of)"
      />
      <Text mb="3.2rem" fontSize="1.6rem" lineHeight="112%" maxW="50rem">
        Cancelling this appointment may attract a 20% cancellation fee if this
        cancellation is less than 24hrs to the scheduled appointment.
      </Text>
      <Flex w="full" maxW="33.8rem" gap=".8rem" mt="2.3rem">
        <Button type="submit" variant="filled" flexGrow="1">
          Proceed
        </Button>
        <Button
          type="button"
          variant="transparent"
          flexGrow="1"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Flex>
    </VStack>
  )
}
