export enum StoreType {
  "product" = "product",
  "service" = "service",
  "productAndService" = "product-and-service",
}

export default interface Store {
  name: string
  type: StoreType
  totalEarningsOnProducts: number
  totalEarningsOnServices: number
  totalProductsSold?: number
  totalAppointments?: number
  totalLocationsDeliveredTo?: number
  totalClientsServiced?: number
} 
