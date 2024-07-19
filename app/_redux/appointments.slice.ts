"use client"
import { createSlice } from "@reduxjs/toolkit"
import {
  fetchAppointments,
  fetchPreviouslyUsedStylists,
} from "./thunks/appoinments.thunk"
import { IAppointmentsState } from "../_types/IAppointmentsState"
import {
  FetchAppointmentsCaseHandlers,
  FetchPreviouslyUsedStylistsCaseHandlers,
} from "./builders.case.handlers/appointments.cases"

const initialState: IAppointmentsState = {
  appointments: [],
  loading: true,
  hasFetchedAppointments: false,
  hasFetchedPreviouslyUsedStylists: false,
  appointmentHistory: [],
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
      .addCase(
        fetchPreviouslyUsedStylists.pending,
        FetchPreviouslyUsedStylistsCaseHandlers.pending
      )
      .addCase(
        fetchPreviouslyUsedStylists.fulfilled,
        FetchPreviouslyUsedStylistsCaseHandlers.fulfilled
      )
      .addCase(
        fetchPreviouslyUsedStylists.rejected,
        FetchPreviouslyUsedStylistsCaseHandlers.rejected
      )
  },
})

export const { clearAppointments } = appointmentsSlice.actions
export const appointmentsReducer = appointmentsSlice.reducer
