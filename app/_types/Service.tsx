import Category from "./Category";
import Product from "./Product";



export default interface Service {
  name: string,
  category: Category
  cost: number
  estimatedDurationInHours: number
  requiredProducts?: Product[]
}