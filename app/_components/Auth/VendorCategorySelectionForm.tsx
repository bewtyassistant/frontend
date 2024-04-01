"use client"
import { Flex, HStack, Heading, Text } from "@chakra-ui/react"
import { AuthCustomSelect, SubmitButton } from "./Inputs"
import { StoreType } from "@/app/_types/Store"
import { FormEventHandler, useCallback, useState } from "react"
import useAxios from "@/app/_hooks/useAxios"
import STORE_URLS from "@/app/_urls/store"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import TimesIcon from "@/app/_assets/TimesIcon"
import useFetchCategories from "@/app/_hooks/useFetchCategories"
import Category from "@/app/_types/Category"
import { useAppDispatch } from "@/app/_redux/store"
import { setUpStore } from "@/app/_redux/store.slice"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

export default function VendorCategorySelectionForm({
  type,
}: {
  type: StoreType
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
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
      if (categories[name].find((it) => value._id === it._id))
        return handleRemove(name, value)
      setCategories((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }))
    },
    [categories, handleRemove]
  )

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      let storeInSessionStorage = sessionStorage.getItem(STORAGE_KEYS.BA_USER_STORE)
      if (storeInSessionStorage) {
        const store = JSON.parse(storeInSessionStorage)
        const res = await fetchData({
          url: STORE_URLS.update(store?._id as string),
          method: "put",
          body: {
            productCategories: categories.product,
            serviceCategories: categories.service,
          },
        })
        if (res.statusCode === 200) {
          console.log(res)
          dispatch(setUpStore(res.store))
          toast.success("Welcome aboard!")
          router.push("/vendor")
          sessionStorage.setItem(STORAGE_KEYS.BA_USER_STORE, JSON.stringify(res.store))
        } else toast.error(res.message)
      } else {
        toast.error("You must create a store first!")
        router.push("/onboarding")
      }
    },
    [categories, fetchData, router]
  )

  return (
    <>
      <Flex
        onSubmit={handleSubmit}
        as="form"
        flexDir="column"
        gap="4rem"
        w="full"
        maxW="40rem"
      >
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
