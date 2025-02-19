import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppSelector } from "@/app/_redux/store"
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppModal from "./AppModal"
import { AppFormLabel, AppInput } from "../Auth/Inputs"
import DownChevron from "@/app/_assets/DownChevron"
import {
  ChangeEvent,
  FormEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import Store from "@/app/_types/Store"
import useAxios from "@/app/_hooks/useAxios"
import toast from "react-hot-toast"
import { debounce } from "@/app/_utils"
import StarRating from "@/app/_assets/StarRating"

export default function NewAppointmentModal() {
  const { showNewAppointmentModal } = useAppSelector((store) => store.ui)
  const toggleShowNewAppointmentModal = useToggleShowNewAppointmentModal()

  return (
    <AppModal
      isOpen={showNewAppointmentModal}
      onClose={toggleShowNewAppointmentModal}
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
          Create a new appointment by providing the below information and
          we&apos;ll find you a match.
        </Text>
        <NewAppointmentForm
          handleCancel={() => toggleShowNewAppointmentModal()}
        />
      </Box>
    </AppModal>
  )
}

const services = [
  {
    _id: "1",
    name: "Retouching",
  },
  {
    _id: "2",
    name: "Weavon fixing",
  },
  {
    _id: "3",
    name: "Braiding",
  },
]

function NewAppointmentForm({ handleCancel }: { handleCancel: () => void }) {
  const { appointmentHistory } = useAppSelector((store) => store.appointments)
  const [servicesRequired, setServicesRequired] = useState<string[]>([])
  const [selectedVendor, setSelectedVendor] = useState<Store | null>(null)
  const [newVendors, setNewVendors] = useState<Store[]>([])
  const [supplementaryVendorsList, setSupplementaryVendorsList] = useState<
    Store[]
  >([])
  const [formData, setFormData] = useState({
    location: "",
    appointmentDateAndTime: "",
    note: "",
    productsToBeUsed: "",
    previouslyUsedVendor: "",
    newVendor: "",
  })
  const [vendorToUse, setVendorToUse] = useState<
    "previously-used-vendor" | "new-vendor" | ""
  >("")

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    []
  )

  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault()
      console.log(formData)
    },
    [formData]
  )

  const { fetchData, loading } = useAxios()
  const [searchCache, setSearchCache] = useState<{ [x: string]: Store[] }>({})
  const fetchNewVendors = useCallback(async () => {
    const cacheKey = formData.location + vendorToUse
    if (loading) return
    if (searchCache[cacheKey])
      return setNewVendors(searchCache[cacheKey] as any)
    if (vendorToUse === "new-vendor" && formData.location) {
      console.log("searching", cacheKey)
      const res = await fetchData({
        url: `/stores/search?location=${formData.location}`,
        method: "get",
      })
      if (res.statusCode === 200) {
        setNewVendors(res.results)
        setSearchCache((prev) => ({
          ...prev,
          [cacheKey]: res.results,
        }))
      } else
        toast.error(
          "Something went wrong with getting new vendors! Please try again"
        )
    }
  }, [formData.location, vendorToUse, loading, searchCache, fetchData])

  const debouncedFetchNewVendors = useMemo(
    () => debounce(fetchNewVendors, 800),
    [fetchNewVendors]
  )

  useEffect(() => {
    debouncedFetchNewVendors()
  }, [debouncedFetchNewVendors])

  return (
    <VStack
      onSubmit={handleSubmit}
      alignItems="center"
      gap="2rem"
      as="form"
      mx="auto"
      w="full"
    >
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
        >
          <ServicesDropdownList
            selectedValues={servicesRequired}
            handleChange={(isChecked: boolean, value: string) => {
              if (isChecked)
                setServicesRequired((prev) => {
                  return prev.includes(value) ? prev : [...prev, value]
                })
              else {
                setServicesRequired((prev) => prev.filter((it) => it === value))
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
        }}
        labelProps={{ fontWeight: "400" }}
      />
      <AppInput
        label="Products to be used"
        inputProps={{
          value: formData.productsToBeUsed,
          onChange,
          name: "productsToBeUsed",
          isRequired: true,
        }}
        labelProps={{ fontWeight: "400" }}
        as="select"
        inputRightAddon={<DownChevron />}
      >
        <option value="">Select products to be used</option>
        <option value="salon">Salon products</option>
        <option value="own">Own products</option>
        <option value="salon-and-own">Own & Salon products</option>
      </AppInput>
      <Box w="full" mx="auto" maxW="40rem">
        <AppFormLabel mb="1rem" fontWeight="normal">
          Choose vendor
        </AppFormLabel>
        <RadioGroup
          display="flex"
          justifyContent="start"
          gap={{ base: ".8rem", md: "10%" }}
          w="full"
          value={vendorToUse}
          onChange={setVendorToUse as any}
        >
          <AppFormLabel
            display="flex"
            alignItems="center"
            gap="6px"
            fontWeight="normal"
          >
            <Radio size="lg" name="vendor" value="previously-used-vendor" />
            <span>Previously used vendor</span>
          </AppFormLabel>
          <AppFormLabel
            display="flex"
            alignItems="center"
            gap="6px"
            fontWeight="normal"
          >
            <Radio size="lg" name="vendor" value="new-vendor" />
            <span>New vendor</span>
          </AppFormLabel>
        </RadioGroup>
      </Box>
      {vendorToUse === "previously-used-vendor" && (
        <AppInput
          label="Previously used vendor"
          inputProps={{
            value: formData.previouslyUsedVendor,
            onChange: (e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              })),
            name: "previouslyUsedVendor",
            isRequired: true,
          }}
          labelProps={{ fontWeight: "400" }}
          as="select"
          inputRightAddon={<DownChevron />}
        >
          <option value="">Select previously used vendor</option>
          {appointmentHistory.map((history) => (
            <option key={history._id} value={history.vendor.name}>
              {history.vendor.name}
            </option>
          ))}
        </AppInput>
      )}
      {vendorToUse === "new-vendor" && (
        <>
          <Box w="full" mx="auto" maxW="40rem">
            <DropDownInput
              label="New vendor"
              value={selectedVendor?.name || ""}
              hasError={!formData.location}
              errorText="Please select a location above to see vendors"
            >
              <NewVendorsDropdownList
                vendors={newVendors}
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
        <Button type="submit" variant="filled" flexGrow="1">
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
}: {
  value: string
  children: ReactNode
  label: string
  hasError?: boolean
  errorText?: string
}) {
  return (
    <Popover placement="bottom" matchWidth>
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
              value: value,
              placeholder: "Select services required",
              type: "text",
              name: "servicesRequired",
              isReadOnly: true,
              cursor: "default",
            }}
            // as="span"
            hasError={hasError}
            errorDescription={errorText}
            inputRightAddon={<DownChevron />}
            labelProps={{ fontWeight: "400" }}
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
}: {
  selectedValues: string[]
  handleChange: (isChecked: boolean, value: string) => void
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
                onChange={(e) => handleChange(e.target.checked, e.target.name)}
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
}: {
  vendors: Store[]
  handleSelect: (store: Store) => void
}) {
  const getStars = useCallback((rating: number) => {
    const stars = new Array(rating)
    stars.fill(1)
    return stars.map((star, idx) => <StarRating key={star + idx} />)
  }, [])
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
                  src={
                    vendor.logo?.secure_url ||
                    "http://acmelogos.com/images/logo-3.svg"
                  }
                  width={{ base: "2.5rem", md: "4rem" }}
                  height={{ base: "2.5rem", md: "4rem" }}
                  rounded="50%"
                  overflow="hidden"
                  alt=""
                  objectFit="cover"
                />
                {vendor.name}
              </Flex>
              <Flex gap=".4rem" alignItems="center" minW="6.4rem">
                {getStars(vendor.rating || idx + 1)}
              </Flex>
            </AppFormLabel>
          ))}
        </CheckboxGroup>
      </Flex>
    </>
  )
}
