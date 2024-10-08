import Product from "./Product"

export enum StoreType {
  "product" = "product",
  "service" = "service",
  "productAndService" = "product-and-service",
}

export default interface Store {
  _id: string
  name: string
  type: StoreType
  totalEarningsOnProducts: number
  totalEarningsOnServices: number
  totalProductsSold?: number
  totalAppointments?: number
  totalLocationsDeliveredTo?: number
  totalClientsServiced?: number
  bestSellingProducts: Product[]
  address: string
  city: string
  state: string
  nearestLandmark: string
  primaryContactNumbers: string[]
  secondaryContactNumbers: string[]
  rating: number
  logo: {
    secure_url: string
  }
}
