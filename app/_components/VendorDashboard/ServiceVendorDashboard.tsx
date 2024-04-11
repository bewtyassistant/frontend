import { VStack } from "@chakra-ui/react"
import DashboardStats from "./DashboardStats"

import Store, { StoreType } from "@/app/_types/Store"
import VendorNextBookedService from "./NextBookService"
import AppointmentsTable from "./AppointmentsTable"

export default function ServiceVendorDashboard({
  loading,
  store,
}: {
  loading?: boolean
  store: Store | null
}) {
  if (store && store.type === StoreType.product) return null
  return (
    <VStack alignItems="stretch" gap={{ base: "3rem", md: "5rem" }}>
      <DashboardStats heading="Saloon" storeType={StoreType.service} />
      <VendorNextBookedService loading={loading} />
      <AppointmentsTable />
    </VStack>
  )
}
