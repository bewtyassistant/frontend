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
import { FormEventHandler, useCallback, useMemo, useRef, useState } from "react"
import useAxios from "@/app/_hooks/useAxios"
import Service, { VendorService } from "@/app/_types/Service"
import { debounce } from "@/app/_utils"
import toast from "react-hot-toast"
import STORE_URLS from "@/app/_urls/store"
import { useAppDispatch } from "@/app/_redux/store"
import { updateServices } from "@/app/_redux/store.slice"
import StatusNotification, { NOTIFICATION_STATUS } from "../StatusNotification"

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
  service,
}: {
  isOpen: boolean
  handleClose: () => void
  formState:
    | keyof typeof STATE_OF_FORM_HEADING
    | keyof typeof STATE_OF_FORM_DESCRIPTION
  service?: VendorService | null
}) {
  const [statusMessage, setStatusMessage] = useState("")

  const { StatusNotificationComponent, toggleShow: toggleShowStatus } =
    StatusNotification({
      timeToDisappearInMilliseconds: 180000,
      status: "SUCCESS",
      children: statusMessage,
    })

  return (
    <>
      <StatusNotificationComponent />
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
            service={service}
            handleClose={handleClose}
            toggleShowNotification={toggleShowStatus}
            updateNotificationMessage={(msg: string) => setStatusMessage(msg)}
          />
        </Box>
      </AppModal>
    </>
  )
}

function ServiceForm({
  isEdit,
  handleClose,
  service,
  toggleShowNotification,
  updateNotificationMessage,
}: {
  isEdit: boolean
  handleClose: () => void
  service?: VendorService | null
  toggleShowNotification: (status: boolean) => void
  updateNotificationMessage: (msg: string) => void
}) {
  const dispatch = useAppDispatch()
  const { fetchData } = useAxios()
  const [searchedServices, setSearchedServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(
    isEdit ? (service?.service as Service) : null
  )
  const [price, setPrice] = useState(isEdit ? service?.price || "sd" : "")
  const [showOptions, setShowOptions] = useState(false)
  const [error, setError] = useState({ selectedService: "", price: "" })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (value.trim().length === 0) {
          setLoading(false)
          return
        }
        setLoading(true)
        try {
          const res = await fetchData({
            url: `/services?search=${value}`,
            method: "get",
          })
          if (res.statusCode === 200 && Array.isArray(res.results)) {
            setSearchedServices(res.results)
          } else {
            toast.error(res.message || "Something went wrong with your search")
          }
        } catch (err) {
          toast.error("An error occurred while searching.")
        } finally {
          setLoading(false)
        }
      }, 800),
    [fetchData]
  )
  const handleSearchForService = useCallback(
    (value: string) => {
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const handleChange = (value: string) => {
    setSearch(value)
    setSelectedService(null)
    setShowOptions(true)
    setError((prev) => ({ ...prev, selectedService: "" }))
    if (value.trim().length === 0) {
      setSearchedServices([])
      setShowOptions(false)
      return
    }
    handleSearchForService(value)
  }

  const serviceInputBoxRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick({
    ref: serviceInputBoxRef,
    handler: () => setShowOptions(false),
  })

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      if (!selectedService)
        return setError((prev) => ({
          ...prev,
          selectedService: "This field is required",
        }))
      if (!price)
        return setError((prev) => ({
          ...prev,
          price: "This field is required",
        }))
      setLoading(true)
      let res
      if (isEdit) {
        res = await fetchData({
          url: STORE_URLS.editService(service?._id as string),
          method: "put",
          body: {
            price,
          },
        })
      } else {
        res = await fetchData({
          url: STORE_URLS.createService(),
          method: "post",
          body: {
            price,
            service: selectedService,
          },
        })
      }
      if (res.statusCode === 201 || res.statusCode === 200) {
        toggleShowNotification(true)
        updateNotificationMessage(
          res.statusCode === 201 ? "Service created!" : "Service edited"
        )
        dispatch(updateServices(res.service))
        handleClose()
      } else {
        toast.error(res.message || "Something went wrong. Please try again")
      }
    },
    [
      price,
      selectedService,
      isEdit,
      handleClose,
      dispatch,
      fetchData,
      service?._id,
      toggleShowNotification,
      updateNotificationMessage,
    ]
  )

  return (
    <>
      <VStack
        onSubmit={handleSubmit}
        as="form"
        alignItems="center"
        gap=".9rem"
        w="full"
        pb="3.8rem"
      >
        <Box
          ref={serviceInputBoxRef}
          w="full"
          maxW="40rem"
          mx="auto"
          pos="relative"
        >
          <AppInput
            label={"Service"}
            inputProps={{
              type: "",
              onChange: (e) => handleChange(e.target.value),
              value: isEdit ? service?.service.name || "" : search,
              placeholder: "Search for a service",
              onFocus: () => !isEdit && setShowOptions(true),
              isReadOnly: isEdit,
            }}
            // helperText="Select the service you offer"
            inputRightAddon={<DownChevron />}
            hasError={error.selectedService.length > 0}
            errorDescription={error.selectedService}
          ></AppInput>
          <List
            pos="absolute"
            top="105%"
            bg="white"
            boxShadow="sm"
            p={showOptions ? "1.4rem" : "0"}
            w="full"
            zIndex={10}
            fontSize="1.6rem"
            maxH="10rem"
            overflowY={showOptions ? "auto" : "hidden"}
            className="styled-scrollbar"
            height={showOptions ? "auto" : "0"}
            transition="height 250ms"
          >
            {search.trim().length === 0 && searchedServices.length === 0 && (
              <Text>Start typing to search for a service</Text>
            )}
            {loading && search.trim().length > 0 ? (
              <Flex gap=".8rem" justifyContent="center" alignItems="center">
                Loading
                <Spinner size="md" />
              </Flex>
            ) : (
              searchedServices.map((service) => (
                <ListItem
                  key={service._id}
                  my=".8rem"
                  onClick={() => {
                    setSelectedService(service)
                    setSearch(service.name)
                    setTimeout(() => {
                      setShowOptions(false)
                    }, 10)
                  }}
                  cursor="pointer"
                >
                  <Text>{service.name}</Text>
                </ListItem>
              ))
            )}
            {!loading &&
              searchedServices.length === 0 &&
              search.trim().length > 0 && (
                <Text>No services matching your search were found</Text>
              )}
          </List>
        </Box>
        <AppInput
          label={"Price"}
          inputProps={{
            type: "number",
            value: price,
            onChange: (e) => {
              setError((prev) => ({ ...prev, price: "" }))
              setPrice(e.target.value)
            },
          }}
          hasError={error.price.length > 0}
          errorDescription={error.price}
          helperText="Write the exact price of the service"
        />
        <Flex w="full" maxW="33.8rem" gap=".8rem" mt="8rem">
          <Button
            type="submit"
            variant="filled"
            flexGrow="1"
            flexShrink="0"
            maxW="16.5rem"
          >
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
