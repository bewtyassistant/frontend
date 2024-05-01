import Product from "./Product"
import Status from "./Status"
import User from "./User"

export default interface Order {
  products: { product: Product; quantity: number }[]
  placedBy: User
  createdAt: string
  deliveryDate: string
  status: Status
  deliveryLocation: string
}