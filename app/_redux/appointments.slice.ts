"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  fetchAppointments,
  fetchPreviouslyUsedStylists,
} from "./thunks/appoinments.thunk"
import { IAppointmentsState } from "../_types/IAppointmentsState"
import {
  FetchAppointmentsCaseHandlers,
  FetchPreviouslyUsedStylistsCaseHandlers,
} from "./builders.case.handlers/appointments.cases"
import { AppointmentRequest } from "../_types/Appointment"

const initialState: IAppointmentsState = {
  appointments: [],
  loading: true,
  hasFetchedAppointments: false,
  hasFetchedPreviouslyUsedStylists: false,
  appointmentHistory: [],
  appointmentRequests: [],
}

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearAppointments: (state) => {
      state = initialState
    },
    addNewAppointmentRequest: (
      state,
      action: PayloadAction<AppointmentRequest>
    ) => {
      state.appointmentRequests = [...state.appointmentRequests, action.payload]
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

export const { clearAppointments, addNewAppointmentRequest } =
  appointmentsSlice.actions
export const appointmentsReducer = appointmentsSlice.reducer
