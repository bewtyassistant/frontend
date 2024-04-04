"use client"
import { Flex, Text } from "@chakra-ui/react"
import AuthLayout from "../_components/Auth/Layout"
import { ReactNode } from "react"
import { SubmitButton } from "../_components/Auth/Inputs"
import { useRouter } from "next/navigation"

export default function Onboarding() {
  const router = useRouter()
  return (
    <>
      <AuthLayout
        headingText={"Vendor Type"}
        subHeadingText="You can be a product or service vendor or both"
      >
        <Flex pos="relative" pl={{ lg: "20%" }}>
          <Flex
            flexDir="column"
            w="full"
            justifyContent={{ base: "center", md: "flex-end" }}
            alignItems="stretch"
            gap={{ base: "2.5rem", md: "3.5rem" }}
            maxW="49rem"
          >
            <StoreTypeOption
              info="Choose if you only sell products"
              onSelect={() => router.push("/onboarding/product-vendor")}
            >
              I am a product vendor
            </StoreTypeOption>
            <StoreTypeOption
              info="Choose if you only provide services"
              onSelect={() => router.push("/onboarding/service-vendor")}
            >
              I am a service vendor
            </StoreTypeOption>
            <StoreTypeOption
              info="Choose if  you sell products & provide services too"
              onSelect={() =>
                router.push("/onboarding/product-and-service-vendor")
              }
            >
              I am a product & service vendor
            </StoreTypeOption>
          </Flex>
        </Flex>
      </AuthLayout>
    </>
  )
}

function StoreTypeOption({
  children,
  info,
  onSelect,
}: {
  children: ReactNode | ReactNode[]
  info: string
  onSelect: () => void
}) {
  return (
    <Flex
      gap=".8rem"
      w="full"
      flexWrap={{ base: "wrap", lg: "nowrap" }}
      alignItems="center"
      justifyContent="center"
    >
      <SubmitButton
        onClick={onSelect}
        w="100%"
        flexShrink="0"
        maxW="31.8rem"
        variant="filled"
      >
        {children}
      </SubmitButton>
      <Text
        flexShrink="1"
        color="gray.400"
        fontSize="1.4rem"
        textAlign={{ base: "center", lg: "left" }}
      >
        {info}
      </Text>
    </Flex>
  )
}
