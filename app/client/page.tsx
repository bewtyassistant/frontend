"use client"
import { Box, VStack } from "@chakra-ui/react"
import MobileSearchHeader from "../_components/Layouts/MobileSearchHeader"
import WelcomeBackHeading from "../_components/Dashboard/WelcomeBackHeading"
import { useAppSelector } from "../_redux/store"
import DashboardStats from "../_components/DashboardClient/Stats"
import { StoreType } from "../_types/Store"
import NextBookedService from "../_components/Dashboard/NextBookService"
import DashboardProductsSection from "../_components/Dashboard/DashboardProductsSection"
import AppointmentsTable from "../_components/DashboardVendor/AppointmentsTable"
import ProductOrdersTable from "../_components/DashboardVendor/ProductOrdersTable"

export default function ClientHome() {
  const { user, loading } = useAppSelector((store) => store.auth)
  return (
    <Box>
      <MobileSearchHeader />
      <WelcomeBackHeading name={user?.firstName} />
      <VStack alignItems="stretch" gap="8rem">
        <VStack alignItems="stretch" gap="3rem">
          <DashboardStats
            heading="Appointments overview"
            loading={loading}
            user={user}
            statsType={StoreType.service}
          />
          <NextBookedService nextBookedService={null} isVendor={false} />
          <AppointmentsTable
            isClient
            tableData={[]}
            loading={loading}
          />
        </VStack>
        <VStack alignItems="stretch" gap="3rem">
          <DashboardStats
            heading="Purchases overview"
            loading={loading}
            user={user}
            statsType={StoreType.product}
          />
          <DashboardProductsSection
            heading="Most purchased products"
            products={[]}
          />
          <ProductOrdersTable
            isClient
            tableData={[]}
            loading={loading}
          />
        </VStack>
      </VStack>
    </Box>
  )
}
