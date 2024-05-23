import Order from "@/app/_types/Order"
import { IOrdersState } from "@/app/_types/IOrdersState"
import { PayloadAction } from "@reduxjs/toolkit"

export const FetchOrdersCaseHandlers: {
  pending: (state: IOrdersState) => void
  fulfilled: (state: IOrdersState, action: PayloadAction<Order[]>) => void
  rejected: (state: IOrdersState) => void
} = {
  pending: (state) => {
    state.loading = true
  },
  fulfilled: (state, action) => {
    state.loading = false
    state.orders = action?.payload
    state.hasFetchedOrders = true
  },
  rejected: (state) => {
    state.loading = false
  },
}
