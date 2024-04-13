"use client"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import User from "../_types/User"

export interface IAuthState {
  isLoggedIn: boolean
  token: null | string
  user: null | User
  loading: boolean
}

const initialState: IAuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  loading: true
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ isLoggedIn: boolean; token: string; user: User }>
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
      state.user = action.payload.user
      state.loading = false
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export const authReducer = authSlice.reducer
