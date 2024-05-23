import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import Appointment from "../_types/Appointment"
import Status from "../_types/Status"
import { ReactNode, useContext, useState } from "react"
import { CustomSelect } from "./Auth/Inputs"
import { KeyValuePair } from "./Dashboard/NextBookService"
import { useAppSelector } from "../_redux/store"
import { AccountTypes } from "../_types/User"

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
  const { user } = useAppSelector((store) => store.auth)
  const [selectedOption, setSelectedOption] = useState("")
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
      <Modal isOpen={showManageModal} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent maxW="85.5rem" w="full" bg="white" rounded="0">
          <ModalHeader bg="brand.main" py={{ base: "3.6rem", md: "3.2rem" }}>
            <Heading
              as="h4"
              color="white"
              size="md"
              lineHeight="3.6rem"
              textAlign="center"
              fontWeight="400"
            >
              Manage appointment
            </Heading>
          </ModalHeader>
          <ModalBody
            pt="3.2rem"
            pb={{ base: "2.8rem", md: "3.6rem" }}
            px={{ base: "4.6rem", md: "7rem" }}
          >
            {!selectedOption && (
              <VStack alignItems="start" gap="3.2rem">
                <Text fontSize="1.6rem">
                  Manage this appointment by rescheduling or cancelling it.
                </Text>
                <VStack
                  mb={{ base: "1.2rem", md: "1.6rem" }}
                  alignItems="start"
                >
                  <ManageAppointmentKeyValuePair
                    keyName={
                      user?.accountType === AccountTypes.VENDOR
                        ? "Client"
                        : "Stylist"
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
                    value={new Date(appointment.bookedDate).toLocaleDateString(
                      "en-us"
                    )}
                  />
                  <ManageAppointmentKeyValuePair
                    keyName={"Appointment Date"}
                    value={new Date(appointment.bookedDate).toLocaleTimeString(
                      "en-us",
                      { hour12: true, hour: "2-digit", minute: "2-digit" }
                    )}
                  />
                </VStack>
                <CustomSelect
                  options={managementOptions}
                  handleSelect={(val) => setManageOption(val)}
                  selectedOption={manageOption}
                  placeholderProps={{ color: "gray.300" }}
                  placeholder="Are you canceling or rescheduling?"
                />
                <Text
                  fontSize="1.6rem"
                  mb=".8rem"
                  mt={{ base: ".8rem", md: "1.6rem" }}
                >
                  Cancelling this appointment may attract a 20% cancellation fee
                  if this cancellation is less than 24hrs to the scheduled
                  appointment.
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
                    isDisabled={!manageOption.value}
                    onClick={() => setSelectedOption(manageOption.value)}
                  >
                    Proceed
                  </Button>
                  <Button
                    onClick={() => setShowManageModal(false)}
                    flexGrow="1"
                    variant="transparent"
                  >
                    Cancel
                  </Button>
                </Flex>
              </VStack>
            )}
            {selectedOption === "cancelling" && (
              <VStack gap="5.2rem">
                <Text fontSize="1.6rem">
                  Are you sure you want to cancel this appointment? You can
                  reschedule it instead.
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
                    isDisabled={!manageOption.value}
                  >
                    Yes, Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedOption("")
                      setManageOption(defaultOption)
                    }}
                    flexGrow="1"
                    variant="transparent"
                  >
                    No, Reschedule
                  </Button>
                </Flex>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
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
