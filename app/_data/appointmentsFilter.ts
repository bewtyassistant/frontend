export class AppointmentFilter {
  public heading: string = ""
  public filterKey: AppointmentFilterKey | "" = ""
  public description: string = ""
  public summary: string = ""

  constructor() {}
  setHeading(heading: string) {
    this.heading = heading
    return this
  }
  setFilterKey(filterKey: AppointmentFilterKey) {
    this.filterKey = filterKey
    return this
  }
  setDescription(description: string) {
    this.description = description
    return this
  }
  setSummary(summary: string) {
    this.summary = summary
    return this
  }
}
export const enum AppointmentFilterKey {
  ALL = "all",
  UPCOMING = "upcoming",
  RESCHEDULED = "rescheduled",
  CANCELLED = "cancelled",
  COMPLETED = "fulfilled",
}

const appointmentsFilters = [
  new AppointmentFilter()
    .setHeading("All appointments")
    .setFilterKey(AppointmentFilterKey.ALL)
    .setDescription(
      "Booked appointments, rescheduled, canceled and completed appointments"
    )
    .setSummary("Manage all appointments"),
  new AppointmentFilter()
    .setHeading("Upcoming")
    .setFilterKey(AppointmentFilterKey.UPCOMING)
    .setDescription("Upcoming appointments")
    .setSummary(
      "View and manage all upcoming appointments, appointments can be rescheduled on approval of the client or passed to another vendor if the client cannot reschedule.Appointments can also be cancelled, both situations attract a fee."
    ),
  new AppointmentFilter()
    .setHeading("Rescheduled")
    .setFilterKey(AppointmentFilterKey.RESCHEDULED)
    .setDescription("Rescheduled appointments")
    .setSummary(
      "View and manage all rescheduled appointments, rescheduled appointments can be cancelled, cancellation fee applies to all appointments that were first rescheduled before cancellation irrespective of the fact that they were cancelled within 48 hours to the appointment date."
    ),
  new AppointmentFilter()
    .setHeading("Cancelled")
    .setFilterKey(AppointmentFilterKey.CANCELLED)
    .setDescription("Cancelled appointments")
    .setSummary("View all cancelled appointments."),
  new AppointmentFilter()
    .setHeading("Completed")
    .setFilterKey(AppointmentFilterKey.COMPLETED)
    .setDescription("Completed appointments")
    .setSummary("View all completed appointments."),
]

export default appointmentsFilters
