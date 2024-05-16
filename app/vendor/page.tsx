"use client"
import { VStack } from "@chakra-ui/react"
import MobileSearchHeader from "../_components/Layouts/MobileSearchHeader"
import { useAppSelector } from "../_redux/store"
import ProductVendorDashboard from "../_components/DashboardVendor/ProductVendorDashboard"
import ServiceVendorDashboard from "../_components/DashboardVendor/ServiceVendorDashboard"
import NoDataDisplay from "../_components/NoDataDisplay"
import WelcomeBackHeading from "../_components/Dashboard/WelcomeBackHeading"
import BasicPageLayout from "../_components/Layouts/BasicPageLayout"

export default function VendorOverviewPage() {
  const { store, loading, ...restOfStoreState } = useAppSelector(
    (store) => store.store
  )
  const { appointments } = useAppSelector((store) => store.appointments)
  const { orders } = useAppSelector((store) => store.orders)
  
  if (!store && !loading) return <NoDataDisplay />
  return (
    <BasicPageLayout>
      <MobileSearchHeader />
      <WelcomeBackHeading name={store?.name} />
      <VStack alignItems="stretch" gap={{ base: "4rem", md: "6rem" }}>
        <ProductVendorDashboard
          metrics={{ ...restOfStoreState }}
          store={store}
          loading={loading}
          orders={orders}
        />
        <ServiceVendorDashboard
          nextBookedService={null}
          store={store}
          metrics={{ ...restOfStoreState }}
          loading={loading}
          appointments={appointments}
        />
      </VStack>
    </BasicPageLayout>
  )
}
