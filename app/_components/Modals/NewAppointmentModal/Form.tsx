import DownChevron from "@/app/_assets/DownChevron"
import StarRating from "@/app/_assets/StarRating"
import useAxios from "@/app/_hooks/useAxios"
import { useAppDispatch, useAppSelector } from "@/app/_redux/store"
import {
  VStack,
  Box,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  CheckboxGroup,
  Checkbox,
  Image,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react"
import Store from "@/app/_types/Store"
import {
  useState,
  useCallback,
  ChangeEvent,
  FormEventHandler,
  useEffect,
  ReactNode,
  useMemo,
} from "react"
import toast, { LoaderIcon } from "react-hot-toast"
import { AppInput, AppFormLabel } from "../../Auth/Inputs"
import Service from "@/app/_types/Service"
import { ErrorTextDisplay } from "../../Auth/ErrorText"
import _, { debounce } from "underscore"
import { fetchAllServices } from "@/app/_redux/thunks/store.thunk"

const TODAY = new Date(Date.now())

export default function NewAppointmentForm({
  handleCancel,
  handleSubmit,
}: {
  handleCancel: () => void
  handleSubmit: (data: { [x: string]: any }) => void
}) {
  const { allServices } = useAppSelector((store) => store.store)
  const dispatch = useAppDispatch()
  const { fetchData } = useAxios()
  const [errorMsg, setErrorMsg] = useState("")
  const [errors, setErrors] = useState<{ [x: string]: string }>({})
  const { appointmentHistory } = useAppSelector((store) => store.appointments)
  const [servicesRequired, setServicesRequired] = useState<string[]>([])
  const [selectedVendor, setSelectedVendor] = useState<Store | null>(null)
  const [vendors, setVendors] = useState<Store[]>([])
  const [idsOfServicesRequired, setServicesRequiredIds] = useState<string[]>([])
  const [formData, setFormData] = useState({
    location: "",
    appointmentDateAndTime: "",
    note: "",
  })
  const [vendorToUse, setVendorToUse] = useState<
    "previously-used-vendor" | "new-vendor" | ""
  >("")

  const isProceedDisabled = useMemo(() => {
    return (
      !formData.location ||
      !formData.appointmentDateAndTime ||
      !vendorToUse ||
      servicesRequired.length === 0 ||
      !selectedVendor
    )
  }, [
    formData.location,
    formData.appointmentDateAndTime,
    vendorToUse,
    selectedVendor,
    servicesRequired,
  ])

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (errors[e.target.name])
        setErrors((prev) => {
          let modified = { ...prev }
          delete modified[e.target.name]
          return modified
        })
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    [errors]
  )

  const onSubmit: FormEventHandler = useCallback(
    async (e) => {
      setErrorMsg("")
      e.preventDefault()
      if (vendorToUse.trim().length === 0)
        return setErrors((prev) => ({
          ...prev,
          newVendor: "Please select a vendor to use",
        }))
      if (new Date(formData.appointmentDateAndTime).getTime() < Date.now())
        return setErrors((prev) => ({
          ...prev,
          appointmentDateAndTime:
            "The appointment date and time cannot be in the past.",
        }))
      handleSubmit({
        ...formData,
        idsOfServicesRequired,
        servicesRequired,
        vendor: selectedVendor,
      })
    },
    [
      formData,
      vendorToUse,
      servicesRequired,
      appointmentHistory,
      handleSubmit,
      selectedVendor,
    ]
  )

  const [loading, setLoading] = useState(false)
  const [searchCache, setSearchCache] = useState<{ [x: string]: Store[] }>({})
  const findVendors = useCallback(
    debounce(async () => {
      if (formData.location && servicesRequired.length > 0 && vendorToUse) {
        const cacheKey =
          formData.location + vendorToUse + servicesRequired.join("")
        if (loading) return
        if (searchCache[cacheKey])
          return setVendors(searchCache[cacheKey] as any)
        setLoading(true)
        setErrors((prev) => ({ ...prev, selectedVendor: "" }))
        const res = await fetchData({
          url: `/stores/search?location=${
            formData.location
          }&idsOfServicesRequired=${idsOfServicesRequired.join(
            ","
          )}&vendorToUse=${vendorToUse}`,
          method: "get",
        })
        if (res.statusCode === 200) {
          setVendors(res.results)
          setSearchCache((prev) => ({
            ...prev,
            [cacheKey]: res.results,
          }))
          if (res.results.length === 0) setErrorMsg("No vendors found")
        } else {
          toast.error(
            "Something went wrong with finding vendors! Please check your connection and try again"
          )
          setSearchCache((prev) => ({
            ...prev,
            [cacheKey]: [],
          }))
        }
        setLoading(false)
      }
    }, 1500),
    [
      formData.location,
      vendorToUse,
      loading,
      searchCache,
      fetchData,
      servicesRequired,
    ]
  )

  useEffect(() => {
    findVendors()
  }, [findVendors])

  useEffect(() => {
    if (allServices.length === 0) dispatch(fetchAllServices())
  }, [dispatch, allServices])

  const updateVendorToUse = useCallback(
    (selection: typeof vendorToUse) => {
      setVendorToUse(selection)
      setSelectedVendor(null)
      setVendors([])
      setErrorMsg("")
    },
    [searchCache, servicesRequired, formData]
  )

  useEffect(() => {
    const cacheKey = formData.location + vendorToUse + servicesRequired.join("")
    const cache = searchCache[cacheKey]
    if (cache && cache.length === 0) setErrorMsg("No vendors found")
    else if (cache && cache.length > 0) {
      setErrorMsg("")
    }
  }, [searchCache, vendorToUse, formData, loading])

  return (
    <VStack
      onSubmit={onSubmit}
      alignItems="center"
      gap="2rem"
      as="form"
      mx="auto"
      w="full"
    >
      <ErrorTextDisplay show={errorMsg.length > 0}>{errorMsg}</ErrorTextDisplay>
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
        <DropDownInput
          label="Services required"
          value={servicesRequired.join(", ")}
          isRequired
          readOnly
        >
          <ServicesDropdownList
            selectedValues={servicesRequired}
            services={allServices}
            handleChange={(
              isChecked: boolean,
              value: string,
              serviceId: string
            ) => {
              if (isChecked) {
                setServicesRequired((prev) => {
                  return prev.includes(value) ? prev : [...prev, value]
                })
                setServicesRequiredIds((prev) => {
                  return prev.includes(serviceId) ? prev : [...prev, serviceId]
                })
              } else {
                setServicesRequired((prev) => prev.filter((it) => it !== value))
                setServicesRequiredIds((prev) =>
                  prev.filter((id) => id !== serviceId)
                )
              }
            }}
          />
        </DropDownInput>
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
          min: TODAY.toISOString().split("T")[0],
        }}
        labelProps={{ fontWeight: "400" }}
        hasError={Boolean(errors.appointmentDateAndTime)}
        errorDescription={errors.appointmentDateAndTime}
      />
      <Box w="full" mx="auto" maxW="40rem">
        <DropDownInput
          label="Vendor to use"
          value={vendorToUse.split("-").join(" ")}
          hasError={Boolean(errors.vendorToUse)}
          errorText={
            errors.vendorToUse ||
            "Please select a location and services above to see vendors"
          }
          isRequired
        >
          <List>
            <ListItem>
              <Button
                type="button"
                bg="none"
                w="full"
                display="flex"
                justifyContent="start"
                onClick={() => updateVendorToUse("previously-used-vendor")}
              >
                Previously used vendor
              </Button>
            </ListItem>
            <ListItem>
              <Button
                type="button"
                bg="none"
                w="full"
                display="flex"
                justifyContent="start"
                onClick={() => updateVendorToUse("new-vendor")}
              >
                New vendor
              </Button>
            </ListItem>
          </List>
        </DropDownInput>
      </Box>
      {vendorToUse && (
        <>
          <Box w="full" mx="auto" maxW="40rem">
            <DropDownInput
              label={vendorToUse.split("-").join(" ")}
              value={selectedVendor?.name || ""}
              readOnly
              closeOnBlur
              closeOnEsc
              hasError={Boolean(errors.selectedVendor) || !formData.location}
              errorText={
                errors.selectedVendor ||
                "Please select a location and services above to see vendors"
              }
              isRequired
            >
              <NewVendorsDropdownList
                isLoading={loading}
                vendors={vendors}
                handleSelect={(store: Store) => {
                  setSelectedVendor(store)
                }}
              />
            </DropDownInput>
          </Box>
        </>
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
        <Button
          type="submit"
          variant="filled"
          flexGrow="1"
          isDisabled={isProceedDisabled}
        >
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

function DropDownInput({
  children,
  value,
  label,
  hasError,
  errorText,
  isRequired,
  closeOnBlur,
  closeOnEsc,
  ...inputProps
}: {
  value: string
  children: ReactNode
  label: string
  hasError?: boolean
  errorText?: string
  isRequired?: boolean
  readOnly?: boolean
  closeOnBlur?: boolean
  closeOnEsc?: boolean
}) {
  return (
    <Popover
      placement="bottom"
      matchWidth
      closeOnBlur={closeOnBlur}
      closeOnEsc={closeOnEsc}
    >
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
          textAlign="left"
        >
          <AppInput
            label={label}
            inputProps={{
              value,
              type: "text",
              isReadOnly: true,
              cursor: "default",
              isRequired,
              autoComplete: "off",
              ...inputProps,
            }}
            hasError={hasError}
            errorDescription={errorText}
            inputRightAddon={<DownChevron />}
            labelProps={{ fontWeight: "400", textTransform: "capitalize" }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="full">
        <PopoverBody
          py="1.4rem"
          bg="white"
          w="full"
          boxShadow="1px 1px 10px #00000017"
        >
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

function ServicesDropdownList({
  selectedValues,
  handleChange,
  services,
}: {
  selectedValues: string[]
  handleChange: (isChecked: boolean, value: string, serviceId: string) => void
  services: Service[]
}) {
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
              <Checkbox
                size="lg"
                name={service.name}
                onChange={(e) =>
                  handleChange(e.target.checked, e.target.name, service._id)
                }
                isChecked={selectedValues.includes(service.name)}
              />
            </AppFormLabel>
          ))}
        </CheckboxGroup>
      </Flex>
    </>
  )
}

function NewVendorsDropdownList({
  vendors,
  handleSelect,
  isLoading,
}: {
  vendors: Store[]
  handleSelect: (store: Store) => void
  isLoading: boolean
}) {
  const getStars = useCallback((rating: number) => {
    const stars = new Array(rating)
    stars.fill(1)
    return stars.map((star, idx) => <StarRating key={star + idx} />)
  }, [])

  if (isLoading)
    return (
      <Flex justifyContent="center" alignItems="center">
        <LoaderIcon />
      </Flex>
    )
  return (
    <>
      <Flex
        flexDir="column"
        gap=".8rem"
        justifyContent="start"
        w="full"
        alignItems="start"
        className="styled-scrollbar"
      >
        <CheckboxGroup>
          {vendors.map((vendor, idx) => (
            <AppFormLabel
              onClick={() => handleSelect(vendor)}
              key={vendor._id}
              fontSize="1.6rem"
              fontWeight="normal"
              display="flex"
              m="0"
              w="full"
              justifyContent="space-between"
              pl="1.5rem"
              pr="2rem"
              cursor="pointer"
              gap={{ md: "2.7rem" }}
            >
              <Flex alignItems="center" gap=".5rem">
                <Image
                  alt=""
                  src={
                    vendor.logo?.secure_url ||
                    "http://acmelogos.com/images/logo-3.svg"
                  }
                  width={{ base: "2.5rem", md: "4rem" }}
                  height={{ base: "2.5rem", md: "4rem" }}
                  rounded="50%"
                  overflow="hidden"
                  objectFit="cover"
                />
                <span>
                  {vendor.name}
                  <Text
                    mt=".2rem"
                    color="#BABEC4"
                    fontSize="1rem"
                    fontWeight="500"
                  >
                    {vendor.address}
                  </Text>
                </span>
              </Flex>
              <Flex
                gap=".4rem"
                alignItems="center"
                justifyContent="start"
                w="7.1rem"
              >
                {getStars(vendor.rating || idx + 1 < 5 ? idx + 1 : 5)}
              </Flex>
            </AppFormLabel>
          ))}
        </CheckboxGroup>
      </Flex>
    </>
  )
}
