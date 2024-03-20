import { Flex } from "@chakra-ui/react"
import { AuthInput, SubmitButton } from "./Inputs"
import { StoreType } from "@/app/_types/Store"

export default function VendorStoreCreationForm({ type }: { type: StoreType }) {
  return (
    <>
      <Flex as="form" flexDir="column" gap="1.2rem" w="full">
        <AuthInput label={"Store name"} inputProps={{}} />
        {(type === StoreType.product ||
          type === StoreType.productAndService) && (
          <AuthInput
            label={"Number of categories of products"}
            inputProps={{}}
          />
        )}
        {(type === StoreType.service ||
          type === StoreType.productAndService) && (
          <AuthInput
            label={"Number of categories of services"}
            inputProps={{}}
          />
        )}
        <AuthInput label={"Phone number"} inputProps={{ type: "tel" }} />
        <AuthInput label={"Shop address"} inputProps={{ type: "tel" }} />
        <Flex gap="1rem" flexWrap={{ base: "wrap", sm: "nowrap" }}>
          <AuthInput
            label={"State"}
            inputProps={{ type: "tel", maxW: { base: "19.5rem", sm: "unset" } }}
          />
          <AuthInput
            label={"City"}
            inputProps={{ type: "tel", maxW: { base: "19.5rem", sm: "unset" } }}
          />
        </Flex>
        <AuthInput
          label={"Landmark closest to store"}
          inputProps={{ type: "tel" }}
        />
        <SubmitButton mt="3rem">Next</SubmitButton>
      </Flex>
    </>
  )
}
