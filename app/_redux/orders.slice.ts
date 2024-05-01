"use client"
import { createSlice } from "@reduxjs/toolkit"
import { IOrdersState } from "../_types/IOrdersState"
import {
  FetchOrdersCaseHandlers,
} from "./builders.case.handlers/orders.cases"
import { fetchOrders } from "./thunks/orders.thunk"

const initialState: IOrdersState = {
  orders: [],
  loading: true,
  hasFetchedOrders: false,
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, FetchOrdersCaseHandlers.pending)
      .addCase(
        fetchOrders.fulfilled,
        FetchOrdersCaseHandlers.fulfilled
      )
      .addCase(
        fetchOrders.rejected,
        FetchOrdersCaseHandlers.rejected
      )
  },
})

export const { clearOrders } = ordersSlice.actions
export const ordersReducer = ordersSlice.reducer
