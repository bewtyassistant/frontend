import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppSelector } from "@/app/_redux/store"
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppModal from "./AppModal"
import { AppFormLabel, AppInput } from "../Auth/Inputs"
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

const services = [
  {
    _id: "1",
    name: "Retouching",
  },
  {
    _id: "2",
    name: "Weavon fixing",
  },
  {
    _id: "3",
    name: "Braiding",
  },
]

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
  const [vendorToUse, setVendorToUse] = useState<
    "previously-used-vendor" | "new-vendor" | ""
  >("")

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
      <Box w="full" mx="auto" maxW="40rem">
        <ServicesInput />
      </Box>
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
        <option value="">Select products to be used</option>
        <option value="salon">Salon products</option>
        <option value="own">Own products</option>
        <option value="salon-and-own">Own & Salon products</option>
      </AppInput>
      <Box w="full" mx="auto" maxW="40rem">
        <AppFormLabel mb="1rem" fontWeight="normal">
          Choose vendor
        </AppFormLabel>
        <RadioGroup
          display="flex"
          justifyContent="start"
          gap={{ base: ".8rem", md: "10%" }}
          w="full"
          value={vendorToUse}
          onChange={setVendorToUse as any}
        >
          <AppFormLabel
            display="flex"
            alignItems="center"
            gap="6px"
            fontWeight="normal"
          >
            <Radio size="lg" name="vendor" value="previously-used-vendor" />
            <span>Previously used vendor</span>
          </AppFormLabel>
          <AppFormLabel
            display="flex"
            alignItems="center"
            gap="6px"
            fontWeight="normal"
          >
            <Radio size="lg" name="vendor" value="new-vendor" />
            <span>New vendor</span>
          </AppFormLabel>
        </RadioGroup>
      </Box>
      {vendorToUse === "previously-used-vendor" && (
        <AppInput
          label="Previously used vendor"
          inputProps={{
            value: formData.productsToBeUsed,
            onChange,
            name: "previouslyUsedVendor",
            isRequired: true,
          }}
          labelProps={{ fontWeight: "400" }}
          as="select"
          inputRightAddon={<DownChevron />}
        >
          <option value="">Select previously used vendor</option>
          {appointmentHistory.map((history) => (
            <option key={history._id} value="salon">
              {history.vendor.name}
            </option>
          ))}
        </AppInput>
      )}
      {vendorToUse === "new-vendor" && (
        <AppInput
          label="New vendor"
          inputProps={{
            value: formData.productsToBeUsed,
            onChange,
            name: "vendors",
            isRequired: true,
          }}
          labelProps={{ fontWeight: "400" }}
          as="select"
          inputRightAddon={<DownChevron />}
          hasError={!formData.location}
          errorDescription={
            !formData.location
              ? "Please enter a location above to see vendors"
              : ""
          }
        >
          <option value="">Select new vendor</option>
          <option value="salon">Salon products</option>
          <option value="own">Own products</option>
          <option value="salon-and-own">Own & Salon products</option>
        </AppInput>
      )}
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

function ServicesInput() {
  return (
    <Popover placement="bottom" matchWidth>
      <PopoverTrigger>
        <Button
          bg="transparent"
          h="unset"
          p="0"
          _focus={{ bg: "transparent", border: "none" }}
          _hover={{ bg: "transparent", border: "none" }}
          border="none"
          type="button"
          w="full"
        >
          <AppInput
            label="Services Required"
            inputProps={{
              placeholder: "Select services required",
              type: "text",
              name: "servicesRequired",
              isReadOnly: true,
              cursor: "default",
            }}
            // as="span"
            inputRightAddon={<DownChevron />}
            labelProps={{ fontWeight: "400" }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="full">
        <PopoverBody bg="white" w="full" boxShadow="1px 1px 10px #00000017">
          <ServicesDropdownList />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

function ServicesDropdownList() {
  return (
    <>
      <Flex
        flexDir="column"
        gap=".8rem"
        justifyContent="start"
        w="full"
        alignItems="start"
      >
        <CheckboxGroup>
          {services.map((service) => (
            <AppFormLabel
              key={service._id}
              fontSize="1.6rem"
              fontWeight="normal"
              display="flex"
              m="0"
              w="full"
              justifyContent="space-between"
              pl="1.5rem"
              pr="2rem"
              cursor="pointer"
            >
              <span>{service.name}</span>
              <Checkbox size="lg" />
            </AppFormLabel>
          ))}
        </CheckboxGroup>
      </Flex>
    </>
  )
}
