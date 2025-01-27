"use client"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Store from "../_types/Store"
import {
  fetchStore,
  fetchStoreStats,
  fetchMostBookedService,
  fetchServices,
} from "./thunks/store.thunk"
import { IStoreState } from "../_types/IStoreState"
import {
  FetchMostBookedServiceCaseHandlers,
  FetchServices,
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
  mostBookedService: null,
  services: [],
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
    updateServices: (state, action) => {
      const index = state.services.findIndex(
        (item) => item._id === action.payload._id
      )
      if (index !== -1) {
        state.services[index] = { ...state.services[index], ...action.payload }
      } else {
        state.services.push(action.payload)
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (service) => service._id !== action.payload._id
      )
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
      .addCase(
        fetchMostBookedService.pending,
        FetchMostBookedServiceCaseHandlers.pending
      )
      .addCase(
        fetchMostBookedService.fulfilled,
        FetchMostBookedServiceCaseHandlers.fulfilled
      )
      .addCase(
        fetchMostBookedService.rejected,
        FetchMostBookedServiceCaseHandlers.rejected
      )
      .addCase(fetchServices.pending, FetchServices.pending)
      .addCase(fetchServices.fulfilled, FetchServices.fulfilled)
      .addCase(fetchServices.rejected, FetchServices.rejected)
  },
})

export const { setUpStore, clearStore, updateServices, deleteService } =
  storeSlice.actions
export const storeReducer = storeSlice.reducer
