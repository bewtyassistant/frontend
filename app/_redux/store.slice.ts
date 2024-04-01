"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Store from "../_types/User"
import { fetchStore } from "./thunks/store.thunk"

export interface IStoreState {
  store: null | Store
  loading: boolean
  hasFetchedStore: boolean
  needsToCreateStore: boolean
}

const initialState: IStoreState = {
  store: null,
  loading: true,
  hasFetchedStore: false,
  needsToCreateStore: false,
}

export const storeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUpStore: (state, action: PayloadAction<{ store: Store }>) => {
      state.store = action.payload.store
      state.needsToCreateStore = false
      state.hasFetchedStore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload === null) state.needsToCreateStore = true
        else {
          state.store = action.payload
          sessionStorage.setItem(
            "BA_USER_STORE",
            JSON.stringify(action.payload)
          )
        }
        state.hasFetchedStore = true
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.loading = false
        console.log(action, "dafds")
      })
  },
})

export const { setUpStore } = storeSlice.actions
export const storeReducer = storeSlice.reducer
