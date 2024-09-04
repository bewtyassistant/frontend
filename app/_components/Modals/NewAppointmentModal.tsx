import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppSelector } from "@/app/_redux/store"
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
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
  }, [formData.location, vendorToUse, loading, searchCache])

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
        <ServicesInput value={servicesRequired.join(", ")}>
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
        </ServicesInput>
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
        <AppInput
          label="New vendor"
          inputProps={{
            value: formData.newVendor,
            onChange,
            name: "newVendor",
            isRequired: true,
          }}
          labelProps={{ fontWeight: "400" }}
          as="select"
          inputRightAddon={<DownChevron />}
          hasError={!formData.location}
          errorDescription={
            !formData.location
              ? "Please enter a location above to see vendors"
              : ""
          }
        >
          <option value="">Select new vendor</option>
          {newVendors.map((vendor) => (
            <option key={vendor._id} value={vendor.name}>
              {vendor.name}
            </option>
          ))}
        </AppInput>
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

function ServicesInput({
  children,
  value,
}: {
  value: string
  children: ReactNode
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
        >
          <AppInput
            label="Services Required"
            inputProps={{
              value: value,
              placeholder: "Select services required",
              type: "text",
              name: "servicesRequired",
              isReadOnly: true,
              cursor: "default",
            }}
            // as="span"
            inputRightAddon={<DownChevron />}
            labelProps={{ fontWeight: "400" }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="full">
        <PopoverBody bg="white" w="full" boxShadow="1px 1px 10px #00000017">
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
