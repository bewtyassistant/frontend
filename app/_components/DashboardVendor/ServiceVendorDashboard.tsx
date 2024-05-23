import { VStack } from "@chakra-ui/react"
import DashboardStats from "./Stats"
import Store, { StoreType } from "@/app/_types/Store"
import VendorNextBookedService from "../Dashboard/NextBookService"
import AppointmentsTable from "./AppointmentsTable"
import Appointment from "@/app/_types/Appointment"
import { IStoreMetrics } from "@/app/_types/IStoreState"
import formatAppointmentsListAsTableData from "@/app/_utils/appointments"

export default function ServiceVendorDashboard({
  loading,
  store,
  nextBookedService,
  appointments,
  metrics,
}: {
  loading?: boolean
  store: Store | null
  nextBookedService: Appointment | null
  appointments: Appointment[]
  metrics: IStoreMetrics
}) {
  if (store && store.type === StoreType.product) return null
  return (
    <VStack alignItems="stretch" gap={{ base: "3rem", md: "5rem" }}>
      <DashboardStats
        heading="Saloon"
        storeType={StoreType.service}
        {...metrics}
      />
      <VendorNextBookedService
        isVendor
        nextBookedService={nextBookedService}
        loading={loading}
      />
      <AppointmentsTable
        tableData={formatAppointmentsListAsTableData(appointments, false)}
        loading={loading}  
      />
    </VStack>
  )
}
