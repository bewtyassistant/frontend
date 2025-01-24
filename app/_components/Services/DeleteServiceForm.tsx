"use client"

import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Portal,
  Spinner,
  Text,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react"
import AppModal from "../Modals/AppModal"
import { AppInput } from "../Auth/Inputs"
import DownChevron from "@/app/_assets/DownChevron"
import { FormEventHandler, useCallback, useRef, useState } from "react"
import useAxios from "@/app/_hooks/useAxios"
import Service, { VendorService } from "@/app/_types/Service"
import { debounce } from "@/app/_utils"
import toast from "react-hot-toast"
import STORE_URLS from "@/app/_urls/store"
import { useAppDispatch } from "@/app/_redux/store"
import { updateServices } from "@/app/_redux/store.slice"
import StatusNotification, { NOTIFICATION_STATUS } from "../StatusNotification"

export default function DeleteServiceForm({
  isOpen,
  handleClose,
  service,
}: {
  isOpen: boolean
  handleClose: () => void
  service?: VendorService | null
}) {
  const { StatusNotificationComponent, toggleShow } = StatusNotification({
    timeToDisappearInMilliseconds: 1800,
    status: "SUCCESS",
    children: "Service deleted",
  })

  const handleDelete = useCallback(() => {
    console.log("Service Deleted successfully!")
    toggleShow(true)
    handleClose()
  }, [service, handleClose])

  return (
    <>
      <StatusNotificationComponent />
      <AppModal
        isOpen={isOpen}
        onClose={handleClose}
        headerContent="Delete service"
        showModalCloseButton
      >
        <Box px="2.4rem" w="full">
          <Text
            textAlign="center"
            maxW="41.6rem"
            fontSize="1.6rem"
            mx="auto"
            my="3.2rem"
          >
            Are you sure you want to delete this service?
          </Text>
          <Flex
            w="full"
            maxW="33.8rem"
            gap=".8rem"
            mt="5.7rem"
            mb="3rem"
            mx="auto"
          >
            <Button
              type="submit"
              variant="filled"
              flexGrow="1"
              flexShrink="0"
              maxW="16.5rem"
              onClick={handleDelete}
            >
              Delete
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
        </Box>
      </AppModal>
    </>
  )
}
