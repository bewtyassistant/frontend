import Category from "./Category";
import Product from "./Product";



export default interface Service {
  _id: string,
  name: string,
  category: Category
  cost: number
  estimatedDurationInHours: number
  requiredProducts?: Product[]
}