import {
  BoxProps,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { KeyValuePair } from "../../Dashboard/NextBookService"
import { ReactNode } from "react"
import EditIcon from "@/app/_assets/EditIcon"
import { ErrorTextDisplay } from "../../Auth/ErrorText"

export default function FormReviewStage({
  handleCancel,
  handleSubmit,
  handleEditForm,
  formData,
  loading,
  errorMsg,
}: {
  handleCancel: () => void
  handleSubmit: (data: { [x: string]: any }) => void
  handleEditForm: () => void
  formData: { [x: string]: any }
  loading: boolean
  errorMsg: string
}) {
  return (
    <>
      <Flex flexDir="column" mx="auto" maxW="42.3rem">
        <Heading
          display="flex"
          alignItems="center"
          fontSize="1.6rem"
          fontWeight="400"
          mb="3.9rem"
        >
          <Text as="span" color="dark.400" display="block" mx="auto">
            Review and confirm appointment.
          </Text>
          <IconButton
            aria-label="edit"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            onClick={handleEditForm}
          >
            <EditIcon />
          </IconButton>
        </Heading>
        <ErrorTextDisplay show={errorMsg.length > 0}>
          {errorMsg}
        </ErrorTextDisplay>
        <VStack alignItems="start" gap="1.6rem" mt="2rem">
          <FormReviewKeyValuePair
            keyName="Location"
            value={formData.location}
          />
          <FormReviewKeyValuePair
            keyName="Service required"
            value={formData.servicesRequired?.join(", ") || ""}
          />
          <FormReviewKeyValuePair
            keyName="Appointment date & time"
            value={new Date(formData.appointmentDateAndTime).toLocaleTimeString(
              "en-us",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          />

          {Boolean(formData.previouslyUsedVendor) ? (
            <FormReviewKeyValuePair
              keyName="Previously used stylist selected"
              value={formData.vendor?.name}
            />
          ) : (
            <FormReviewKeyValuePair
              keyName="Vendor"
              value={formData.vendor?.name}
            />
          )}
          <FormReviewKeyValuePair
            keyName="Note of importance"
            value={formData.note}
          />
        </VStack>
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
            isLoading={loading}
            onClick={() => handleSubmit(formData)}
          >
            Request
          </Button>
          <Button
            variant="transparent"
            maxH="5.4rem"
            flexGrow="1"
            maxW="16.5rem"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </HStack>
      </Flex>
    </>
  )
}

function FormReviewKeyValuePair({
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
        color: "dark.100",
        fontWeight: "700",
        fontSize: { base: "16px", md: "14px" },
        ...keyProps,
      }}
      valueProps={{
        color: "dark.100",
        fontSize: { base: "16px", md: "14px" },
        ...valueProps,
        textTransform: "capitalize",
      }}
    />
  )
}
