import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppSelector } from "@/app/_redux/store"
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import AppModal from "./AppModal"
import { AppInput } from "../Auth/Inputs"
import DownChevron from "@/app/_assets/DownChevron"
import { ChangeEvent, FormEventHandler, useCallback, useState } from "react"

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

function NewAppointmentForm({ handleCancel }: { handleCancel: () => void }) {
  const { appointmentHistory } = useAppSelector((store) => store.appointments)
  const [previouslyUsedStylist, setPreviouslyUsedStylist] = useState({
    name: "",
    _id: "",
    type: "",
  })
  const [formData, setFormData] = useState({
    location: "",
    appointmentDateAndTime: "",
    note: "",
    productsToBeUsed: "",
  })
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (e.target.name === "previouslyUsedStylist") {
        if (e.target.value) {
          const update = JSON.parse(e.target.value)
          setPreviouslyUsedStylist(update as any)
        } else {
          setPreviouslyUsedStylist({
            name: "",
            _id: "",
            type: "",
          })
        }
      } else
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      console.log(formData, previouslyUsedStylist)
    },
    [formData]
  )

  return (
    <VStack
      onSubmit={handleSubmit}
      alignItems="center"
      gap="2rem"
      as="form"
      mx="auto"
      w="full"
    >
      <AppInput
        label="Location"
        inputProps={{
          placeholder: "Enter location",
          value: formData.location,
          onChange,
          name: "location",
          isRequired: true,
        }}
        labelProps={{ fontWeight: "400" }}
        helperText="(Enter the name of your prefered area, e.g GRA phase 1.)"
      />
      <AppInput
        label="Appointment date & time"
        inputProps={{
          placeholder: "Select date and time for appointment",
          type: "datetime-local",
          value: formData.appointmentDateAndTime,
          onChange,
          name: "appointmentDateAndTime",
          isRequired: true,
        }}
        labelProps={{ fontWeight: "400" }}
      />
      {appointmentHistory.length > 0 && (
        <AppInput
          label="Select previously used stylist"
          inputProps={{
            value: JSON.stringify(previouslyUsedStylist),
            onChange,
            name: "previouslyUsedStylist",
            isRequired: true,
          }}
          labelProps={{ fontWeight: "400" }}
          as="select"
          inputRightAddon={<DownChevron />}
        >
          <option
            value={JSON.stringify({
              name: "",
              _id: "",
              type: "",
            })}
          >
            Select previously used stylist
          </option>
          {appointmentHistory.map((history) => (
            <option
              key={history._id}
              id={history._id}
              value={JSON.stringify(history.vendor)}
            >
              {history.vendor.name}
            </option>
          ))}
        </AppInput>
      )}
      <AppInput
        label="Products to be used"
        inputProps={{
          value: formData.productsToBeUsed,
          onChange,
          name: "productsToBeUsed",
          isRequired: true,
        }}
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
          value: formData.note,
          onChange,
          name: "note",
        }}
        labelProps={{ fontWeight: "400" }}
        as="textarea"
        helperText="(Say something you'd like us to take note of)"
      />
      <Text
        mb={{ base: "", md: "2.2rem" }}
        fontSize="1.6rem"
        lineHeight="112%"
        maxW="50rem"
      >
        Cancelling this appointment may attract a 20% cancellation fee if this
        cancellation is less than 24hrs to the scheduled appointment.
      </Text>
      <Flex
        w="full"
        maxW="33.8rem"
        gap=".8rem"
        mt={{ base: "1rem", md: "2.3rem" }}
      >
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
