import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppModal from "./AppModal"
import StatusNotification from "../StatusNotification"
import { KeyValuePair } from "../Dashboard/NextBookService"
import { ReactNode, useState } from "react"

export default function AppointmentRescheduleConfirmationModal() {
  const [showModal, setShowModal] = useState(true)
  const { StatusNotificationComponent, toggleShow } = StatusNotification({
    timeToDisappearInMilliseconds: 8000,
    status: "SUCCESS",
    children: "",
  })

  return (
    <>
      <StatusNotificationComponent />
      <AppModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        headerContent={<>Appointment reschedule</>}
        showModalCloseButton
        closeOnOutsideClick={false}
      >
        <Box pt="3.2rem" pb={{ base: "13rem", md: "8.8rem" }}>
          <Collapse in={true}>
            <Flex flexDir="column" mx="auto" maxW="42.3rem">
              <Heading
                display="flex"
                alignItems="center"
                fontSize="1.6rem"
                fontWeight="400"
              >
                <Text as="span" color="dark.400" display="block" mx="auto">
                  This appointment has been rescheduled by the client with the
                  below new information
                </Text>
              </Heading>
              <VStack alignItems="start" gap="1.33rem" mt="1.9rem" px="1.68rem">
                <RescheduleKeyValuePair
                  keyName="Client"
                  value="Mrs Christabel Musa"
                />
                <RescheduleKeyValuePair
                  keyName="New appointment date"
                  value={new Date(Date.now()).toLocaleDateString("en-us", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                />
                <RescheduleKeyValuePair
                  keyName="Appointment date & time"
                  value={new Date(Date.now()).toLocaleTimeString("en-us", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                />
                <RescheduleKeyValuePair
                  keyName="Note of importance"
                  value="I will be coming with my toddler, i'll like all harmful objects to be kept in places she cannot access, thanks."
                  valueProps={{ color: "dark.100" }}
                />
              </VStack>
              <Text
                fontSize="1.6rem"
                as="span"
                color="dark.400"
                display="block"
                mt="3rem"
                mx="auto"
              >
                You can accept the reschedule or decline if it is not convenient
                for you.
              </Text>
              <HStack
                gap=".8rem"
                justifyContent="center"
                alignItems="center"
                mt="8rem"
              >
                <Button
                  variant="filled"
                  maxH="5.4rem"
                  flexGrow="1"
                  maxW="16.5rem"
                  type="button"
                >
                  Accept
                </Button>
                <Button
                  variant="transparent"
                  maxH="5.4rem"
                  flexGrow="1"
                  maxW="16.5rem"
                  type="button"
                >
                  Reject
                </Button>
              </HStack>
            </Flex>
          </Collapse>
        </Box>
      </AppModal>
    </>
  )
}

function RescheduleKeyValuePair({
  keyName,
  value,
  keyProps,
  valueProps,
}: {
  keyName: string
  value: ReactNode
  keyProps?: BoxProps
  valueProps?: BoxProps
}) {
  return (
    <KeyValuePair
      keyName={keyName}
      value={value}
      keyProps={{
        fontSize: { base: "14px", md: "16px" },
        ...keyProps,
      }}
      valueProps={{
        color: "brand.main",
        fontSize: { base: "14px", md: "16px" },
        ...valueProps,
      }}
    />
  )
}
