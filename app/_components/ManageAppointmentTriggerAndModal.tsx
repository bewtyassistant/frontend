import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react"
import Appointment from "../_types/Appointment"
import Status from "../_types/Status"
import {
  FormEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react"
import { AppInput, CustomSelect } from "./Auth/Inputs"
import { KeyValuePair } from "./Dashboard/NextBookService"
import { useAppSelector } from "../_redux/store"
import { AccountTypes } from "../_types/User"
import AppModal from "./Modals/AppModal"

const managementOptions = [
  {
    displayValue: "Cancelling",
    value: "cancelling",
  },
  {
    displayValue: "Rescheduling",
    value: "rescheduling",
  },
]

const defaultOption = {
  displayValue: "",
  value: "",
}

export default function ManageAppointmentTriggerAndModal({
  appointment,
}: {
  appointment: Appointment
}) {
  const headerContent = {
    cancelling: "Manage appointment",
    rescheduling: "Reschedule appointment",
  }
  const [selectedOption, setSelectedOption] = useState("")
  const [hasProceeded, setHasProceeded] = useState(false)
  const [showManageModal, setShowManageModal] = useState(false)
  const [manageOption, setManageOption] = useState(defaultOption)
  return (
    <>
      <Button
        onClick={() => setShowManageModal(true)}
        variant="filled"
        size="sm"
        padding=".75rem 1.6rem"
        fontSize={{ base: "1rem", md: "1.6rem" }}
        rounded="2.4rem"
        isDisabled={
          appointment.status === Status.CANCELLED ||
          Date.now() > new Date(appointment.bookedDate).getTime()
        }
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

      <AppModal
        isOpen={showManageModal}
        onClose={() => {}}
        headerContent={
          hasProceeded
            ? headerContent[selectedOption as keyof typeof headerContent]
            : "Manage appointment"
        }
      >
        <Box
          pt="3.2rem"
          pb={{ base: "2.8rem", md: "3.6rem" }}
          px={{ base: "4.6rem", md: "7rem" }}
        >
          {!selectedOption && (
            <VStack alignItems="start" gap="3.2rem">
              <AppointmentInfo appointment={appointment} />
              <AppointmentActionForm
                handleClose={() => setShowManageModal(false)}
                handleSubmit={() => {
                  setSelectedOption(manageOption.value)
                  setHasProceeded(true)
                }}
                selectedOption={manageOption}
                handleChange={(val) => setManageOption(val)}
              />
            </VStack>
          )}
          {selectedOption === "cancelling" && (
            <CancellingConfirmationForm
              handleCancel={() => {
                setSelectedOption("rescheduling")
                setManageOption({
                  displayValue: "Rescheduling",
                  value: "rescheduling",
                })
              }}
              isConfirmationDisabled={!manageOption.value}
            />
          )}
          {selectedOption === "rescheduling" && (
            <ReschedulingForm
              handleCancel={() => {
                setSelectedOption("")
                setManageOption(defaultOption)
              }}
            />
          )}
        </Box>
      </AppModal>
    </>
  )
}

function ManageAppointmentKeyValuePair({
  keyName,
  value,
}: {
  keyName: ReactNode
  value: ReactNode
}) {
  return (
    <KeyValuePair
      keyName={keyName as string}
      value={value}
      keyProps={{ fontSize: "1.6rem" }}
      valueProps={{ fontSize: "1.6rem", color: "brand.main" }}
    />
  )
}

function AppointmentInfo({ appointment }: { appointment: Appointment }) {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <>
      <Text fontSize="1.6rem">
        Manage this appointment by rescheduling or cancelling it.
      </Text>
      <VStack mb={{ base: "1.2rem", md: "1.6rem" }} alignItems="start">
        <ManageAppointmentKeyValuePair
          keyName={
            user?.accountType === AccountTypes.VENDOR ? "Client" : "Stylist"
          }
          value={
            user?.accountType === AccountTypes.VENDOR
              ? appointment.client.firstName ||
                appointment.client.lastName ||
                appointment.client.email
              : appointment.vendor.name
          }
        />
        <ManageAppointmentKeyValuePair
          keyName={"Appointment Date"}
          value={new Date(appointment.bookedDate).toLocaleDateString("en-us")}
        />
        <ManageAppointmentKeyValuePair
          keyName={"Appointment Date"}
          value={new Date(appointment.bookedDate).toLocaleTimeString("en-us", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </VStack>
    </>
  )
}

function AppointmentActionForm({
  handleSubmit,
  handleClose,
  selectedOption,
  handleChange,
}: {
  handleSubmit: () => void
  handleClose: () => void
  handleChange: (val: { value: string; displayValue: string }) => void
  selectedOption: { value: string; displayValue: string }
}) {
  return (
    <>
      <CustomSelect
        options={managementOptions}
        handleSelect={handleChange}
        selectedOption={selectedOption}
        placeholderProps={{ color: "gray.300" }}
        placeholder="Are you canceling or rescheduling?"
      />
      <Text fontSize="1.6rem" mb=".8rem" mt={{ base: ".8rem", md: "1.6rem" }}>
        Cancelling this appointment may attract a 20% cancellation fee if this
        cancellation is less than 24hrs to the scheduled appointment.
      </Text>
      <Flex
        w="full"
        maxW="33.8rem"
        mx="auto"
        justifyContent="center"
        alignItems="stretch"
        gap=".8rem"
      >
        <Button
          flexGrow="1"
          variant="filled"
          border="1px solid"
          borderColor="brand.main"
          isDisabled={!selectedOption.value}
          onClick={handleSubmit}
        >
          Proceed
        </Button>
        <Button onClick={handleClose} flexGrow="1" variant="transparent">
          Cancel
        </Button>
      </Flex>
    </>
  )
}

function CancellingConfirmationForm({
  handleCancel,
  isConfirmationDisabled,
}: {
  handleCancel: () => void
  isConfirmationDisabled: boolean
}) {
  return (
    <>
      <VStack gap="5.2rem">
        <Text fontSize="1.6rem">
          Are you sure you want to cancel this appointment? You can reschedule
          it instead.
        </Text>
        <Flex
          w="full"
          maxW="33.8rem"
          mx="auto"
          justifyContent="center"
          alignItems="stretch"
          gap=".8rem"
        >
          <Button
            flexGrow="1"
            variant="filled"
            border="1px solid"
            borderColor="brand.main"
            type="submit"
            isDisabled={isConfirmationDisabled}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCancel}
            flexGrow="1"
            variant="transparent"
            type="button"
          >
            Reschedule
          </Button>
        </Flex>
      </VStack>
    </>
  )
}

function ReschedulingForm({ handleCancel }: { handleCancel: () => void }) {
  const [formData, setFormData] = useState({
    newDate: "",
    note: "",
  })

  const handleReschedule: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      console.log(formData)
    },
    [formData]
  )
  return (
    <>
      <VStack gap="3.2rem" as="form" onSubmit={handleReschedule}>
        <Text fontSize="1.6rem">
          Reschedule this appointment by providing the below information.
        </Text>
        <VStack w="full" maxW="40rem" gap="2.8rem">
          <AppInput
            label="New appointment date & time"
            inputProps={{
              w: "full",
              type: "datetime-local",
              value: formData.newDate,
              onChange: (e) =>
                setFormData((prev) => ({ ...prev, newDate: e.target.value })),
            }}
          />
          <AppInput
            label="Note of importance"
            inputProps={{
              w: "full",
              h: "16.6rem",
              resize: "none",
              value: formData.note,
              onChange: (e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value })),
            }}
            as="textarea"
            helperText="(Say something you'd like us to take note of)"
          />
        </VStack>
        <Text fontSize="1.6rem">
          Rescheduling this appointment may attract a 10% cancellation fee if
          this cancellation is less than 24hrs to the scheduled appointment.{" "}
        </Text>
        <Flex
          w="full"
          maxW="33.8rem"
          mx="auto"
          justifyContent="center"
          alignItems="stretch"
          gap=".8rem"
        >
          <Button
            flexGrow="1"
            variant="filled"
            border="1px solid"
            borderColor="brand.main"
            type="submit"
            isDisabled={formData.newDate.length === 0}
          >
            Reschedule
          </Button>
          <Button
            onClick={handleCancel}
            flexGrow="1"
            variant="transparent"
            type="button"
          >
            Cancel
          </Button>
        </Flex>
      </VStack>
    </>
  )
}
