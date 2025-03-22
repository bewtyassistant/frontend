const STORE_URLS = {
  create: () => `/stores`,
  update: (storeId: string) => `/stores/${storeId}`,
  get: () => `/stores/me`,
  getStats: () => `/stores/me/stats`,
  getMostBookedService: () => `/stores/me/stats/most-booked-service`,
  getStoreServices: () => `/stores/me/services`,
  getServices: () => `/services`,
  createService: () => `/stores/me/services`,
  editService: (vendorServiceId: string) =>
    `/stores/me/services/${vendorServiceId}`,
  deleteService: (vendorServiceId: string) =>
    `/stores/me/services/${vendorServiceId}`,
}
export default STORE_URLS
