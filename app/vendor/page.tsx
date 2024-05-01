"use client"
import { VStack } from "@chakra-ui/react"
import MobileSearchHeader from "../_components/Layouts/MobileSearchHeader"
import { useAppSelector } from "../_redux/store"
import ProductVendorDashboard from "../_components/DashboardVendor/ProductVendorDashboard"
import ServiceVendorDashboard from "../_components/DashboardVendor/ServiceVendorDashboard"
import NoDataDisplay from "../_components/NoDataDisplay"
import WelcomeBackHeading from "../_components/Dashboard/WelcomeBackHeading"

export default function VendorOverviewPage() {
  const { store, loading, ...restOfStoreState } = useAppSelector(
    (store) => store.store
  )
  if (!store && !loading) return <NoDataDisplay />
  return (
    <VStack alignItems="stretch">
      <MobileSearchHeader />
      <WelcomeBackHeading name={store?.name} />
      <VStack alignItems="stretch" gap={{ base: "4rem", md: "6rem" }}>
        <ProductVendorDashboard
          metrics={{ ...restOfStoreState }}
          store={store}
          loading={loading}
          orders={[]}
        />
        <ServiceVendorDashboard
          nextBookedService={null}
          store={store}
          metrics={{ ...restOfStoreState }}
          loading={loading}
          appointments={[]}
        />
      </VStack>
    </VStack>
  )
}
