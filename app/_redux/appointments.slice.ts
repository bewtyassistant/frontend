"use client"
import { createSlice } from "@reduxjs/toolkit"
import { fetchAppointments } from "./thunks/appoinments.thunk"
import { IAppointmentsState } from "../_types/IAppointmentsState"
import {
  FetchAppointmentsCaseHandlers,
} from "./builders.case.handlers/appointments.cases"

const initialState: IAppointmentsState = {
  appointments: [],
  loading: true,
  hasFetchedAppointments: false,
}

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearAppointments: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, FetchAppointmentsCaseHandlers.pending)
      .addCase(
        fetchAppointments.fulfilled,
        FetchAppointmentsCaseHandlers.fulfilled
      )
      .addCase(
        fetchAppointments.rejected,
        FetchAppointmentsCaseHandlers.rejected
      )
  },
})

export const { clearAppointments } = appointmentsSlice.actions
export const appointmentsReducer = appointmentsSlice.reducer
