const STORE_URLS = {
  create: () => `/stores`,
  update: (storeId: string) => `/stores/${storeId}`,
  get: () => `/stores/me`,
  getStats: () => `/stores/me/stats`,
  getMostBookedService: () => `/stores/me/stats/most-booked-service`,
  getServices: () => `/stores/me/services`,
  createService: () => `/stores/me/services`,
  editService: (vendorServiceId: string) =>
    `/stores/me/services/${vendorServiceId}`,
}
export default STORE_URLS
