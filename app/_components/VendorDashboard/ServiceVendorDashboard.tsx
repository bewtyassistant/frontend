import { VStack } from "@chakra-ui/react"
import DashboardStats from "./DashboardStats"

import { StoreType } from "@/app/_types/Store"
import VendorNextBookedService from "./NextBookService"
import AppointmentsTable from "./AppointmentsTable"

export default function ServiceVendorDashboard() {
  return (
    <VStack alignItems="stretch" gap={{ base: "3rem", md: "5rem" }}>
      <DashboardStats heading="Saloon" storeType={StoreType.service} />
      <VendorNextBookedService loading />
      <AppointmentsTable />
    </VStack>
  )
}
