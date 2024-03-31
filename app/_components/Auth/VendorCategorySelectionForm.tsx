"use client"
import citiesInNigeria from "@/app/_data/citiesInNigeria.json"
import statesInNigeria from "@/app/_data/statesInNigeria.json"
import { Flex, HStack, Heading, Text } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "./Inputs"
import { StoreType } from "@/app/_types/Store"
import DownChevron from "@/app/_assets/DownChevron"
import { FormEventHandler, useCallback, useMemo, useState } from "react"
import { getArrayOfNumbersArithimeticallyIncreasingByOne } from "@/app/_utils"
import useAxios from "@/app/_hooks/useAxios"
import STORE_URLS from "@/app/_urls/store"
import toast from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import TimesIcon from "@/app/_assets/TimesIcon"

const requiredFields = [
  "name",
  "phoneNumber",
  "address",
  "state",
  "city",
  "nearestLandmark",
]

export default function VendorCategorySelectionForm({
  type,
}: {
  type: StoreType
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { fetchData, loading } = useAxios({ initialLoadingState: false })

  const numberOfCategoriesOptionsList = useMemo(
    () => getArrayOfNumbersArithimeticallyIncreasingByOne({ length: 9 }),
    []
  )
  const [categories, setCategories] = useState({
    product: [],
    service: [],
  })

  const handleChange = useCallback(
    (name: keyof typeof categories, value: string) => {
      setCategories((prev) => ({
        ...prev,
        [name]: [...prev[name], JSON.parse(value)],
      }))
    },
    []
  )

  const handleRemove = useCallback(
    (name: keyof typeof categories, category: any) => {
      setCategories((prev) => ({
        ...prev,
        [name]: prev[name].filter((it) => it.name !== category.name),
      }))
    },
    []
  )

  return (
    <>
      <Flex as="form" flexDir="column" gap="4rem" w="full" maxW="40rem">
        {(type === StoreType.product ||
          type === StoreType.productAndService) && (
          <AuthInput
            label={
              type === StoreType.product ? "Categories" : "Product categories"
            }
            inputProps={{
              type: "number",
              value: "",
              name: "productCategories",
              onChange: (e) => handleChange("product", e.target.value),
            }}
            as="select"
            inputRightAddon={<DownChevron />}
          >
            <option value="">
              {type === StoreType.product ? "Categories" : "Product categories"}
            </option>
            {statesInNigeria.map((state) => (
              <option value={JSON.stringify(state)} key={state.name}>
                {state.name}
              </option>
            ))}
          </AuthInput>
        )}
        {categories.product.length > 0 && (
          <HStack flexWrap="wrap" gap="1.2rem">
            <Heading fontSize="2rem" fontWeight="400" w="full">
              Product categories
            </Heading>
            {categories.product.map((category) => (
              <SelectedOption
                handleRemove={() => handleRemove("product", category)}
                key={category.name}
                value={category.name}
              />
            ))}
          </HStack>
        )}
        {(type === StoreType.service ||
          type === StoreType.productAndService) && (
          <AuthInput
            label={
              type !== StoreType.service ? "Service categories" : "Categories"
            }
            inputProps={{
              value: "",
              name: "service categories",
              onChange: (e) => handleChange("service", e.target.value),
            }}
            as="select"
            inputRightAddon={<DownChevron />}
          >
            <option value="">
              {type !== StoreType.service ? "Service categories" : "Categories"}
            </option>
            {statesInNigeria.map((state) => (
              <option value={JSON.stringify(state)} key={state.name}>
                {state.name}
              </option>
            ))}
          </AuthInput>
        )}
        {categories.service.length > 0 && (
          <HStack flexWrap="wrap" gap="1.2rem">
            <Heading fontSize="2rem" fontWeight="400" w="full">
              Service categories
            </Heading>
            {categories.service.map((category) => (
              <SelectedOption
                handleRemove={() => handleRemove("service", category)}
                key={category.name}
                value={category.name}
              />
            ))}
          </HStack>
        )}
        <SubmitButton
          isLoading={loading}
          loadingText="Creating your store"
          type="submit"
          mt="50%"
        >
          Save
        </SubmitButton>
      </Flex>
    </>
  )
}

function SelectedOption({
  value,
  handleRemove,
}: {
  value: string
  handleRemove: () => void
}) {
  return (
    <Text
      rounded="2rem"
      border="1px solid #D6D8DC"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize="1.6rem"
      fontWeight="400"
      px="2rem"
      py="1rem"
      gap="1rem"
    >
      <Text as="span">{value}</Text>
      <Text
        as="button"
        color="#D6D8DC"
        bg="transparent"
        _hover={{ bg: "transparentt" }}
        type="button"
        onClick={handleRemove}
      >
        <TimesIcon />
      </Text>
    </Text>
  )
}
