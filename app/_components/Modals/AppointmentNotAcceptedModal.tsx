
import { Box, Button, HStack, Text } from "@chakra-ui/react"
import AppModal from "./AppModal"
import { useState } from "react"

export default function AppointmentNotAcceptedModal() {
  const [show, setShow] = useState(true)

  return (
    <AppModal
      isOpen={show}
      onClose={() => setShow(false)}
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
          We&apos;re sorry, Beauty Zone could not accept your appointment, you
          can wait for the next 10 mins or choose a different vendor.
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
            Choose vendor
          </Button>
          <Button
            variant="transparent"
            maxH="5.4rem"
            flexGrow="1"
            maxW="16.5rem"
            type="button"
          >
            Wait 10 mins
          </Button>
        </HStack>
      </Box>
    </AppModal>
  )
}
