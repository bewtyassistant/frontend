"use client"
import citiesInNigeria from "@/app/_data/citiesInNigeria.json"
import statesInNigeria from "@/app/_data/statesInNigeria.json"
import { Flex } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "./Inputs"
import { StoreType } from "@/app/_types/Store"
import DownChevron from "@/app/_assets/DownChevron"
import { FormEventHandler, useCallback, useMemo, useState } from "react"
import { getArrayOfNumbersArithimeticallyIncreasingByOne } from "@/app/_utils"
import useAxios from "@/app/_hooks/useAxios"
import STORE_URLS from "@/app/_urls/store"
import toast from "react-hot-toast"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch } from "@/app/_redux/store"
import { setUpStore } from "@/app/_redux/store.slice"
import STORAGE_KEYS from "@/app/STORAGE_KEYS"

const requiredFields = [
  "name",
  "phoneNumber",
  "address",
  "state",
  "city",
  "nearestLandmark",
]

export default function VendorStoreCreationForm({ type }: { type: StoreType }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { fetchData, loading } = useAxios({ initialLoadingState: false })
  const [errors, setErrors] = useState<{ [x: string]: string }>({})
  const requiredFieldsByType = useMemo(() => {
    if (type === StoreType.product)
      return [...requiredFields, "numberOfProductCategories"]
    else if (type === StoreType.service)
      return [...requiredFields, "numberOfServiceCategories"]
    else
      return [
        ...requiredFields,
        "numberOfProductCategories",
        "numberOfServiceCategories",
      ]
  }, [type])
  const numberOfCategoriesOptionsList = useMemo(
    () => getArrayOfNumbersArithimeticallyIncreasingByOne({ length: 9 }),
    []
  )
  const [storeData, setStoreData] = useState({
    name: "",
    numberOfProductCategories: 0,
    numberOfServiceCategories: 0,
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    nearestLandmark: "",
    type,
  })

  const updateErrorsIfValueIsInvalid = useCallback(
    (name: string, value: string) => {
      if (requiredFieldsByType.includes(name)) {
        if (Boolean(value.toString().trim()))
          setErrors((prev) => ({ ...prev, [name]: "" }))
        else
          setErrors((prev) => ({ ...prev, [name]: "This field is required" }))
      }
    },
    [requiredFieldsByType]
  )

  const handleChange = useCallback(
    (name: keyof typeof storeData, value: string) => {
      updateErrorsIfValueIsInvalid(name, value)
      setStoreData((prev) => ({ ...prev, [name]: value }))
    },
    [updateErrorsIfValueIsInvalid]
  )

  const checkForAndHandleErrors = useCallback(() => {
    let hasErrors = false
    Object.keys(storeData).forEach((key) => {
      if (requiredFieldsByType.includes(key)) {
        if (Boolean(storeData[key as keyof typeof storeData]) === false) {
          if (hasErrors === false) hasErrors = true
          setErrors((prev) => ({ ...prev, [key]: "This field is required" }))
        }
      }
    })
    return hasErrors
  }, [storeData, requiredFieldsByType])

  const createStore = useCallback(
    async (data: typeof storeData) => {
      const res = await fetchData({
        url: STORE_URLS.create(),
        method: "post",
        body: data,
      })
      if (res.statusCode === 201 || res.statusCode === 200) return [true, res]
      else return [false, res]
    },
    [fetchData]
  )

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault()
      const hasErrors = checkForAndHandleErrors()
      if (hasErrors) return
      const [success, res] = await createStore(storeData)
      toast.remove()
      if (success) {
        sessionStorage.setItem(
          STORAGE_KEYS.BA_USER_STORE,
          JSON.stringify(res.store)
        )
        dispatch(setUpStore(res.store))
        toast.success(res.message)
        let nextPath = `${pathname}/categories`
        if (res.statusCode === 200) nextPath = "/vendor"
        router.push(nextPath)
      } else {
        toast.error(res.message)
      }
    },
    [
      storeData,
      checkForAndHandleErrors,
      pathname,
      router,
      createStore,
      dispatch,
    ]
  )

  return (
    <>
      <Flex
        onSubmit={handleSubmit}
        as="form"
        flexDir="column"
        gap="1.2rem"
        w="full"
        maxW="40rem"
      >
        <AuthInput
          hasError={Boolean(errors.name)}
          errorDescription={errors.name}
          label={"Store name"}
          inputProps={{
            type: "text",
            value: storeData.name,
            name: "name",
            onChange: (e) => handleChange("name", e.target.value),
          }}
        />
        {(type === StoreType.product ||
          type === StoreType.productAndService) && (
          <AuthInput
            hasError={Boolean(errors.numberOfProductCategories)}
            errorDescription={errors.numberOfProductCategories}
            label={"Number of categories of products"}
            inputProps={{
              type: "number",
              value: storeData.numberOfProductCategories,
              name: "numberOfProductCategories",
              onChange: (e) =>
                handleChange("numberOfProductCategories", e.target.value),
            }}
            as="select"
            inputRightAddon={<DownChevron />}
          >
            <option value=""></option>
            {numberOfCategoriesOptionsList.map((num) => (
              <option key={num}>{num}</option>
            ))}
            <option value="10">10+</option>
          </AuthInput>
        )}
        {(type === StoreType.service ||
          type === StoreType.productAndService) && (
          <AuthInput
            hasError={Boolean(errors.numberOfServiceCategories)}
            errorDescription={errors.numberOfServiceCategories}
            label={"Number of categories of services"}
            inputProps={{
              value: storeData.numberOfServiceCategories,
              name: "numberOfServiceCategories",
              onChange: (e) =>
                handleChange("numberOfServiceCategories", e.target.value),
            }}
            as="select"
            inputRightAddon={<DownChevron />}
          >
            <option value=""></option>
            {numberOfCategoriesOptionsList.map((num) => (
              <option key={num}>{num}</option>
            ))}
            <option value="10">10+</option>
          </AuthInput>
        )}
        <AuthInput
          hasError={Boolean(errors.phoneNumber)}
          errorDescription={errors.phoneNumber}
          label={"Phone number"}
          inputProps={{
            type: "tel",
            value: storeData.phoneNumber,
            name: "phoneNumber",
            onChange: (e) => handleChange("phoneNumber", e.target.value),
          }}
        />
        <AuthInput
          hasError={Boolean(errors.address)}
          errorDescription={errors.address}
          label={"Shop address"}
          inputProps={{
            type: "text",
            value: storeData.address,
            name: "address",
            onChange: (e) => handleChange("address", e.target.value),
          }}
        />
        <Flex gap="1rem" flexWrap={{ base: "wrap", sm: "nowrap" }}>
          <AuthInput
            hasError={Boolean(errors.state)}
            errorDescription={errors.state}
            label={"State"}
            inputProps={{
              maxW: { base: "19.5rem", sm: "unset" },
              value: storeData.state,
              name: "state",
              onChange: (e) => {
                handleChange("state", e.target.value)
                handleChange("city", "")
              },
            }}
            as="select"
            inputRightAddon={<DownChevron />}
          >
            <option value=""></option>
            {statesInNigeria.map((state) => (
              <option value={state.name} key={state.name}>
                {state.name}
              </option>
            ))}
          </AuthInput>
          <AuthInput
            hasError={Boolean(errors.city)}
            errorDescription={errors.city}
            label={"City"}
            inputProps={{
              maxW: { base: "19.5rem", sm: "unset" },
              value: storeData.city,
              name: "city",
              onChange: (e) => handleChange("city", e.target.value),
            }}
            as="select"
            inputRightAddon={<DownChevron />}
          >
            <option value=""></option>
            {(
              citiesInNigeria[
                storeData.state as keyof typeof citiesInNigeria
              ] || []
            ).map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </AuthInput>
        </Flex>
        <AuthInput
          hasError={Boolean(errors.nearestLandmark)}
          errorDescription={errors.nearestLandmark}
          label={"Landmark closest to store"}
          inputProps={{
            type: "text",
            value: storeData.nearestLandmark,
            name: "nearestLandmark",
            onChange: (e) => handleChange("nearestLandmark", e.target.value),
          }}
        />
        <SubmitButton
          isLoading={loading}
          loadingText="Creating your store"
          type="submit"
          mt="3rem"
        >
          Next
        </SubmitButton>
      </Flex>
    </>
  )
}
