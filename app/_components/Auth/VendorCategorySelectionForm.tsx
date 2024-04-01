"use client"
import citiesInNigeria from "@/app/_data/citiesInNigeria.json"
import statesInNigeria from "@/app/_data/statesInNigeria.json"
import { Flex, HStack, Heading, Select, Text } from "@chakra-ui/react"
import { AuthCustomSelect, AuthInput, SubmitButton } from "./Inputs"
import { StoreType } from "@/app/_types/Store"
import DownChevron from "@/app/_assets/DownChevron"
import { FormEventHandler, useCallback, useMemo, useState } from "react"
import { getArrayOfNumbersArithimeticallyIncreasingByOne } from "@/app/_utils"
import useAxios from "@/app/_hooks/useAxios"
import STORE_URLS from "@/app/_urls/store"
import toast from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import TimesIcon from "@/app/_assets/TimesIcon"
import useFetchCategories from "@/app/_hooks/useFetchCategories"
import Category from "@/app/_types/Category"

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
  const { categories: categoriesToSelectFrom } = useFetchCategories({
    categoriesToFetch: {
      product:
        type === StoreType.product || type === StoreType.productAndService,
      service:
        type === StoreType.service || type === StoreType.productAndService,
    },
  })
    
  const [categories, setCategories] = useState<{
    product: Category[]
    service: Category[]
  }>({
    product: [],
    service: [],
  })


  const handleRemove = useCallback(
    (name: keyof typeof categories, category: Category) => {
      setCategories((prev) => ({
        ...prev,
        [name]: prev[name].filter((it) => it._id !== category._id),
      }))
    },
    []
  )

  const handleChange = useCallback(
    (name: keyof typeof categories, value: Category) => {
      if(categories[name].find(it => value._id === it._id)) return handleRemove(name, value)
      setCategories((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }))
    },
    [categories]
  )

  const handleSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault()
    console.log(categories)
  }, [categories])

  return (
    <>
      <Flex onSubmit={handleSubmit} as="form" flexDir="column" gap="4rem" w="full" maxW="40rem">
        {(type === StoreType.product ||
          type === StoreType.productAndService) && (
          <AuthCustomSelect
            options={categoriesToSelectFrom.product.map((productCategory) => ({
              displayValue: productCategory.name,
              value: productCategory,
            }))}
            handleSelect={(value) => handleChange("product", value)}
            placeholder={
              type !== StoreType.product ? "Product categories" : "Categories"
            }
            selectedOptions={categories.product.map((serviceCategory) => ({
              displayValue: serviceCategory.name,
              value: serviceCategory,
            }))}
          />
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
          <AuthCustomSelect
            options={categoriesToSelectFrom.service.map((serviceCategory) => ({
              displayValue: serviceCategory.name,
              value: serviceCategory,
            }))}
            handleSelect={(value) => handleChange("service", value)}
            placeholder={
              type !== StoreType.service ? "Service categories" : "Categories"
            }
            selectedOptions={categories.service.map((serviceCategory) => ({
              displayValue: serviceCategory.name,
              value: serviceCategory,
            }))}
          />
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
          loadingText="Saving..."
          type="submit"
          mt="3%"
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
