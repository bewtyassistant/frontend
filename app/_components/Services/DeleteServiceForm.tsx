"use client"

import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react"
import AppModal from "../Modals/AppModal"
import { useCallback } from "react"
import useAxios from "@/app/_hooks/useAxios"
import { VendorService } from "@/app/_types/Service"
import toast from "react-hot-toast"
import { useAppDispatch } from "@/app/_redux/store"
import { deleteService } from "@/app/_redux/store.slice"
import STORE_URLS from "@/app/_urls/store"
import StatusNotification from "../StatusNotification"

export default function DeleteServiceFormModal({
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

  return (
    <>
      <StatusNotificationComponent />
      <AppModal
        isOpen={isOpen}
        onClose={handleClose}
        headerContent="Delete service"
        showModalCloseButton
      >
        <DeleteServiceForm
          toggleShowNotification={toggleShow}
          service={service}
          handleClose={handleClose}
        />
      </AppModal>
    </>
  )
}

function DeleteServiceForm({
  handleClose,
  service,
  toggleShowNotification,
}: {
  handleClose: () => void
  service?: VendorService | null
  toggleShowNotification: (value: boolean) => void
}) {
  const { fetchData } = useAxios()
  const dispatch = useAppDispatch()

  const handleDelete = useCallback(async () => {
    toggleShowNotification(true)
    const res = await fetchData({
      url: STORE_URLS.deleteService(service?._id as string),
      method: "delete",
    })
    console.log("Service Deleted successfully!", res)
    if (res.statusCode === 204) {
      toggleShowNotification(true)
      setTimeout(() => {
        dispatch(deleteService(service))
      }, 1200)
      handleClose()
    } else {
      toast.error(
        res.message || "Unable to delete service. Something went wrong!"
      )
    }
  }, [handleClose, toggleShowNotification, dispatch, service, fetchData])

  return (
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
      <Flex w="full" maxW="33.8rem" gap=".8rem" mt="5.7rem" mb="3rem" mx="auto">
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
  )
}
