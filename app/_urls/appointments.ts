const APPOINTMENT_URLS = {
  getStoreAppointments: (storeId: string) => `/appointments/${storeId}`,
  getUserAppointments: () => `/appointments`,
  getPreviouslyUsedStylists: () => `/me/history/vendors?type=service,product-and-service`,
}
export default APPOINTMENT_URLS
