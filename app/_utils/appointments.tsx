import { ReactNode } from "react"
import { getStatusRepresentation } from "."
import Appointment from "../_types/Appointment"
import User from "../_types/User"
import ManageAppointmentTriggerAndModal from "../_components/ManageAppointmentTriggerAndModal"
import Status from "../_types/Status"

export default function formatAppointmentsListAsTableData(
  appointmentsList: Appointment[],
  enableManageAppointment?: boolean
) {
  return appointmentsList.map((appointment, idx) => {
    const manageButton = <ManageAppointmentTriggerAndModal appointment={appointment} />
    let statusAndManagement = [
      appointment.status === Status.FULFILLED
        ? getStatusRepresentation(appointment.status)
        : null,
    ]
    if (enableManageAppointment && appointment.status !== Status.FULFILLED)
      statusAndManagement.push(manageButton)
    const requiredProducts = joinListOfStrings(
      appointment.services?.map((it) =>
        joinListOfObjectsWithStringValueAtKey(
          it.requiredProducts || [{}],
          "name"
        )
      )
    )
    const tableData: ReactNode[] = [
      getCustomerName(appointment.client),
      new Date(appointment.bookedDate).toDateString(),
      formatTime(appointment.bookedDate),
      joinListOfObjectsWithStringValueAtKey(appointment.services, "name"),
      requiredProducts || "---",
      formatNumber(appointment.totalPrice || 0),
      ...statusAndManagement,
    ]
    return tableData
  })
}

function getCustomerName(user: User) {
  return user?.firstName && user?.lastName
    ? `${user?.firstName} ${user?.lastName}`
    : user?.email
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-us", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  })
}

function joinListOfObjectsWithStringValueAtKey(
  list: { [x: string]: any }[],
  key: string
) {
  return list?.reduce(
    (acc, it) => acc + (acc ? ", " : "") + (it[key] || ""),
    ""
  )
}

function joinListOfStrings(list: string[]) {
  return list?.reduce((acc, it) => acc + (acc ? ", " : "") + (it || ""), "")
}

function formatNumber(num: number) {
  return num?.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  })
}
