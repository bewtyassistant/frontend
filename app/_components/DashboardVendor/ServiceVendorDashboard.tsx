import { VStack } from "@chakra-ui/react"
import DashboardStats from "./Stats"

import Store, { StoreType } from "@/app/_types/Store"
import VendorNextBookedService from "../Dashboard/NextBookService"
import AppointmentsTable from "./AppointmentsTable"
import Appointment from "@/app/_types/Appointment"
import { ReactNode } from "react"
import { getStatusRepresentation } from "@/app/_utils"
import { IStoreMetrics } from "@/app/_types/IStoreState"

function formatAppointmentsListAsTableData(appointmentsList: Appointment[]) {
  return appointmentsList.map((appointment) => {
    const customerName = `${appointment.client?.firstName} ${appointment.client?.lastName}`
    const appointmentDate = new Date(appointment.bookedDate).toDateString()
    const appointmentTime = new Date(appointment.bookedDate).toLocaleTimeString(
      "en-us",
      {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }
    )
    const requiredProducts = appointment.services
      ?.map((service) => service.requiredProducts?.join(", "))
      .join(", ")
    const appointmentPrice = (appointment.totalCost || 0)?.toLocaleString(
      "en-NG",
      {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }
    )
    const tableData: ReactNode[] = [
      customerName,
      appointmentDate,
      appointmentTime,
      appointment.services?.join(", "),
      requiredProducts,
      appointmentPrice,
      getStatusRepresentation(appointment.status),
    ]

    return tableData
  })
}
export default function ServiceVendorDashboard({
  loading,
  store,
  nextBookedService,
  appointments,
  metrics
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
        tableData={formatAppointmentsListAsTableData(appointments)}
        loading={loading}
      />
    </VStack>
  )
}
