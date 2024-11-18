
const STORE_URLS = {
  create: () => `/stores`, 
  update: (storeId: string) => `/stores/${storeId}`,
  get: () => `/stores/me`,
  getStats: () => `/stores/me/stats`,
  getMostBookedService: () => `/stores/me/stats/most-booked-service`,
}
export default STORE_URLS 