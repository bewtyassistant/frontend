import Product from "./Product";
import User from "./User";


export default interface Order{
  product: Product
  placedBy: User
  createdAt: string
  deliveryDate: string,
  productQuantity: number
  fulfilled: true
}