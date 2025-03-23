import Appointment, { AppointmentHistory, AppointmentRequest } from "./Appointment"

export interface IAppointmentsState {
  appointments: Appointment[]
  loading: boolean
  hasFetchedPreviouslyUsedStylists: boolean
  hasFetchedAppointments: boolean
  appointmentHistory: AppointmentHistory[]
  appointmentRequests: AppointmentRequest[]
}

