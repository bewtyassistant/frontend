import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import User from "../_types/User"

export interface IAuthState {
  isLoggedIn: boolean
  token: null | string
}

const initialState: IAuthState = {
  isLoggedIn: false,
  token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ isLoggedIn: boolean; token: string }>
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = null
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export const authReducer = authSlice.reducer
