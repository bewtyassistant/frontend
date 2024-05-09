import Category from "./Category"
import Store from "./Store"


export default interface Product {
  name: string
  price: number
  _id: string
  category: Category
  totalStock: number
  colors: string[]
  sizes: string[]
  variants: string[]
  store: Store
}