import Service from "./Service"
import Status from "./Status"
import Store, { StoreType } from "./Store"
import User from "./User"

export default interface Appointment {
  services: Service[]
  bookedDate: string
  client: User
  vendor: Store
  totalPrice: number
  status: Status
  isRescheduled: boolean
}

export interface AppointmentHistory {
  _id: string
  client: string
  vendor: {
    _id: string
    type: StoreType
    name: string
    id: string
  }
  type: StoreType
  id: string
}
