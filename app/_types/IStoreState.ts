import Service, { VendorService } from "./Service"
import Store from "./Store"

export interface IStoreMetrics {
  totalSaloonEarnings?: number
  totalNumberOfFulfilledAppointments?: number
  totalNumberOfClientsServiced?: number
  totalNumberOfProductsSold?: number
  totalEarningsOnProducts?: number
  totalNumberOfLocationsDeliveredTo?: number
}

export interface IStoreState extends IStoreMetrics {
  store: null | Store
  loading: boolean
  hasFetchedStore: boolean
  needsToCreateStore: boolean
  mostBookedService: Service | null
  storeServices: VendorService[]
  allServices: Service[]
}
