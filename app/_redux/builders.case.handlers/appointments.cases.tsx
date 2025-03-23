import Appointment, { AppointmentHistory } from "@/app/_types/Appointment"
import { IAppointmentsState } from "@/app/_types/IAppointmentsState"
import { PayloadAction } from "@reduxjs/toolkit"

export const FetchAppointmentsCaseHandlers: {
  pending: (state: IAppointmentsState) => void
  fulfilled: (
    state: IAppointmentsState,
    action: PayloadAction<Appointment[]>
  ) => void
  rejected: (state: IAppointmentsState) => void
} = {
  pending: (state) => {
    state.loading = true
  },
  fulfilled: (state, action) => {
    state.loading = false
    state.appointments = action?.payload
    state.hasFetchedAppointments = true
  },
  rejected: (state) => {
    state.loading = false
  },
}

export const FetchPreviouslyUsedStylistsCaseHandlers: {
  pending: (state: IAppointmentsState) => void
  fulfilled: (
    state: IAppointmentsState,
    action: PayloadAction<AppointmentHistory[]>
  ) => void
  rejected: (state: IAppointmentsState) => void
} = {
  pending: (state) => {
    state.loading = true
  },
  fulfilled: (state, action) => {
    state.loading = false
    state.appointmentHistory = action?.payload || []
    state.hasFetchedPreviouslyUsedStylists = true
  },
  rejected: (state) => {
    state.loading = false
  },
}
