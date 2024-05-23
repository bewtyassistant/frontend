const APPOINTMENT_URLS = {
  getStoreAppointments: (storeId: string) => `/appointments/${storeId}`,
  getUserAppointments: () => `/appointments`,
}
export default APPOINTMENT_URLS
