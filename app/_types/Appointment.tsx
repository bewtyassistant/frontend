import Service from "./Service"
import Status from "./Status"
import Store from "./Store"
import User from "./User"

export default interface Appointment {
  services: Service[]
  bookedDate: string
  client: User
  vendor: Store
  totalPrice: number
  status: Status
}
