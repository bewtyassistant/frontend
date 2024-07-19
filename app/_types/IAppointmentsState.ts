import Appointment, { AppointmentHistory } from "./Appointment"

export interface IAppointmentsState {
  appointments: Appointment[]
  loading: boolean
  hasFetchedPreviouslyUsedStylists: boolean
  hasFetchedAppointments: boolean
  appointmentHistory: AppointmentHistory[]
}

