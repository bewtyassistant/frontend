import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import { IStoreState } from "@/app/_types/IStoreState"
import Service from "@/app/_types/Service"
import Store from "@/app/_types/Store"
import { PayloadAction } from "@reduxjs/toolkit"

export const FetchStoreCaseHandlers: {
  pending: (state: IStoreState) => void
  fulfilled: (state: IStoreState, action: PayloadAction<Store | null>) => void
  rejected: (state: IStoreState) => void
} = {
  pending: (state) => {
    state.loading = true
  },
  fulfilled: (state, action) => {
    state.loading = false
    if (action?.payload === null) state.needsToCreateStore = true
    else {
      state.store = action?.payload
      sessionStorage.setItem(
        STORAGE_KEYS.BA_USER_STORE,
        JSON.stringify(action?.payload)
      )
    }
    state.hasFetchedStore = true
  },
  rejected: (state) => {
    state.loading = false
  },
}
export const FetchStoreStatisticsCaseHandlers: {
  pending: (state: IStoreState) => void
  fulfilled: (
    state: IStoreState,
    action: PayloadAction<
      {
        message: string
        statusCode: number
      } & IStoreState
    >
  ) => void
  rejected: (state: IStoreState) => void
} = {
  pending: (state) => {
    state.loading = true
  },
  fulfilled: (state, action) => {
    state.loading = false
    state.totalSaloonEarnings = action.payload.totalSaloonEarnings
    state.totalNumberOfFulfilledAppointments =
      action.payload.totalNumberOfFulfilledAppointments
    state.totalNumberOfClientsServiced =
      action.payload.totalNumberOfClientsServiced
    state.totalNumberOfProductsSold = action.payload.totalNumberOfProductsSold
    state.totalEarningsOnProducts = action.payload.totalEarningsOnProducts
    state.totalNumberOfLocationsDeliveredTo =
      action.payload.totalNumberOfLocationsDeliveredTo
  },
  rejected: (state) => {
    state.loading = false
  },
}

export const FetchMostBookedServiceCaseHandlers: {
  pending: (state: IStoreState) => void
  fulfilled: (
    state: IStoreState,
    action: PayloadAction<
      {
        message: string
        statusCode: number
        mostBookedService?: Service | null
      } & IStoreState
    >
  ) => void
  rejected: (state: IStoreState) => void
} = {
  pending: (state) => {
    state.loading = true
  },
  fulfilled: (state, action) => {
    if (
      action.payload.statusCode === 200 &&
      action.payload.mostBookedService !== null
    )
      state.mostBookedService = action.payload.mostBookedService
  },
  rejected: (state) => {
    state.loading = false
  },
}
