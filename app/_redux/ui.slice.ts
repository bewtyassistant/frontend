"use client"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import User from "../_types/User"

export interface IUIState {
  showNewAppointmentModal: boolean
}

const initialState: IUIState = {
  showNewAppointmentModal: false,
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowNewAppointmentModal: (state, action: PayloadAction<boolean | undefined>) => {
      state.showNewAppointmentModal =
        typeof action.payload === "boolean"
          ? action.payload
          : !state.showNewAppointmentModal
    },
  },
})

export const { toggleShowNewAppointmentModal } = uiSlice.actions
export const uiReducer = uiSlice.reducer
