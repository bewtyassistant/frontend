"use client"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Store from "../_types/Store"
import { fetchStore, fetchStoreStats } from "./thunks/store.thunk"
import { IStoreState } from "../_types/IStoreState"
import {
  FetchStoreCaseHandlers,
  FetchStoreStatisticsCaseHandlers,
} from "./builders.case.handlers/store.cases"

const initialState: IStoreState = {
  store: null,
  loading: true,
  hasFetchedStore: false,
  needsToCreateStore: false,
  totalSaloonEarnings: 0,
  totalNumberOfFulfilledAppointments: 0,
  totalNumberOfClientsServiced: 0,
  totalNumberOfProductsSold: 0,
  totalEarningsOnProducts: 0,
  totalNumberOfLocationsDeliveredTo: 0,
}

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setUpStore: (state, action: PayloadAction<{ store: Store }>) => {
      state.store = action.payload.store
      state.needsToCreateStore = false
      state.hasFetchedStore = true
    },
    clearStore: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, FetchStoreCaseHandlers.pending)
      .addCase(fetchStore.fulfilled, FetchStoreCaseHandlers.fulfilled)
      .addCase(fetchStore.rejected, FetchStoreCaseHandlers.rejected)
      .addCase(
        fetchStoreStats.pending,
        FetchStoreStatisticsCaseHandlers.pending
      )
      .addCase(
        fetchStoreStats.fulfilled,
        FetchStoreStatisticsCaseHandlers.fulfilled
      )
      .addCase(
        fetchStoreStats.rejected,
        FetchStoreStatisticsCaseHandlers.rejected
      )
  },
})

export const { setUpStore, clearStore } = storeSlice.actions
export const storeReducer = storeSlice.reducer
