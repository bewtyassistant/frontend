"use client"
import { Flex, VStack } from "@chakra-ui/react"
import MobileSearchHeader from "../_components/Layouts/MobileSearchHeader"
import { useAppSelector } from "../_redux/store"
import Star from "../_assets/StarIcon"
import ProductVendorDashboard from "../_components/VendorDashboard/ProductVendorDashboard"
import ServiceVendorDashboard from "../_components/VendorDashboard/ServiceVendorDashboard"
import NoDataDisplay from "../_components/NoDataDisplay"

export default function VendorOverviewPage() {
  const { store, loading } = useAppSelector((store) => store.store)

  console.log(store)
  if (!store && !loading) return <NoDataDisplay />
  return (
    <VStack alignItems="stretch">
      <MobileSearchHeader />
      <Flex
        as="h1"
        alignItems="center"
        lineHeight={{ base: "2.2rem", sm: "3.6rem" }}
        fontSize={{ base: "2rem", sm: "3.2rem" }}
        gap=".5rem"
        color="brand.main"
        mt={{ base: "1.5rem" }}
        mb={{ base: "3rem", sm: "5rem" }}
      >
        Welcome Back {store?.name}!
        <Flex gap="1.1rem" as="span" color="transparent">
          <Star />
          <Star />
          <Star />
          <Star />
        </Flex>
      </Flex>
      <VStack alignItems="stretch" gap={{ base: "4rem", md: "6rem" }}>
        <ProductVendorDashboard store={store} loading={loading} />
        <ServiceVendorDashboard store={store} loading={loading}/>
      </VStack>
    </VStack>
  )
}
