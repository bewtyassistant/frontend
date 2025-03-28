import Service from "./Service"
import Status from "./Status"
import Store, { StoreType } from "./Store"
import User from "./User"

export default interface Appointment {
  services: Service[]
  bookedDate: string
  client: User
  vendor: Store
  totalCost: number
  status: Status
  isRescheduled: boolean
}

export interface AppointmentRequest {
  servicesRequired: (string | Service)[]
  appointmentDateAndTime: string
  client: string | User
  vendor: string | Store
  location: string
  note: string
  vendorToUse: "previously-used-vendor" | "new-vendor"
  status: "pending" | "accepted" | "rejected"
}

export interface AppointmentHistory {
  _id: string
  client: string
  vendor: Store
  type: StoreType
  id: string
}
