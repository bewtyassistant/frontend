import Orders from "./Order"

export interface IOrdersState {
  orders: Orders[]
  loading: boolean
  hasFetchedOrders: boolean
}

