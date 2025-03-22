"use client"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Store from "../_types/Store"
import {
  fetchStore,
  fetchStoreStats,
  fetchMostBookedService,
  fetchStoreServices,
  fetchAllServices,
} from "./thunks/store.thunk"
import { IStoreState } from "../_types/IStoreState"
import {
  FetchMostBookedServiceCaseHandlers,
  FetchAllServices,
  FetchStoreServices,
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
  storeServices: [],
  allServices: [],
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
      const index = state.storeServices.findIndex(
        (item) => item._id === action.payload._id
      )
      if (index !== -1) {
        state.storeServices[index] = {
          ...state.storeServices[index],
          ...action.payload,
        }
      } else {
        state.storeServices.push(action.payload)
      }
    },
    deleteService: (state, action) => {
      state.storeServices = state.storeServices.filter(
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
      .addCase(fetchStoreServices.pending, FetchStoreServices.pending)
      .addCase(fetchStoreServices.fulfilled, FetchStoreServices.fulfilled)
      .addCase(fetchStoreServices.rejected, FetchStoreServices.rejected)
      .addCase(fetchAllServices.pending, FetchAllServices.pending)
      .addCase(fetchAllServices.fulfilled, FetchAllServices.fulfilled)
      .addCase(fetchAllServices.rejected, FetchAllServices.rejected)
  },
})

export const { setUpStore, clearStore, updateServices, deleteService } =
  storeSlice.actions
export const storeReducer = storeSlice.reducer
