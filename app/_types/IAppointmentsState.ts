import Appointment from "./Appointment"

export interface IAppointmentsState {
  appointments: Appointment[]
  loading: boolean
  hasFetchedAppointments: boolean
}

