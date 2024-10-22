"use client"

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import AppModal from "../Modals/AppModal"
import { AppInput } from "../Auth/Inputs"
import DownChevron from "@/app/_assets/DownChevron"

const STATE_OF_FORM_HEADING = {
  create: "Create a new service",
  edit: "Edit service",
}

const STATE_OF_FORM_DESCRIPTION = {
  create:
    "Create a new service you offer explicitly with it’s fixed price that the client will be charged, for example - retouching of hair with salon products - N2,000, retouching of hair with own products - N1,000",
  edit: "Make changes to the service type or change the price.",
}

export default function NewServiceForm({
  isOpen,
  handleClose,
  formState,
}: {
  isOpen: boolean
  handleClose: () => void
  formState:
    | keyof typeof STATE_OF_FORM_HEADING
    | keyof typeof STATE_OF_FORM_DESCRIPTION
}) {
  return (
    <>
      <AppModal
        isOpen={isOpen}
        onClose={handleClose}
        headerContent={STATE_OF_FORM_HEADING[formState]}
        showModalCloseButton
      >
        <Box px="2.4rem" w="full">
          <Text maxW="41.6rem" fontSize="1.6rem" mx="auto" my="3.2rem">
            {STATE_OF_FORM_DESCRIPTION[formState]}
          </Text>
          <ServiceForm
            isEdit={formState === "edit"}
            handleClose={handleClose}
          />
        </Box>
      </AppModal>
    </>
  )
}

function ServiceForm({
  isEdit,
  handleClose,
}: {
  isEdit: boolean
  handleClose: () => void
}) {
  return (
    <>
      <VStack as="form" alignItems="center" gap=".9rem" w="full" pb="3.8rem">
        <AppInput
          label={"Service"}
          inputProps={{ type: "" }}
          as="select"
          helperText="Select the service you offer"
          inputRightAddon={<DownChevron />}
        >
          <option>Available services</option>
          <option>Available services</option>
          <option>Available services</option>
        </AppInput>
        <AppInput
          label={"Price"}
          inputProps={{
            type: "number",
          }}
          helperText="Write the exact price of the service"
        />
        <Flex w="full" maxW="33.8rem" gap=".8rem" mt="8rem">
          <Button variant="filled" flexGrow="1" flexShrink="0" maxW="16.5rem">
            {isEdit ? "Save" : "Create"}
          </Button>
          <Button
            variant="transparent"
            flexGrow="1"
            flexShrink="1"
            maxW="16.5rem"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Flex>
      </VStack>
    </>
  )
}
