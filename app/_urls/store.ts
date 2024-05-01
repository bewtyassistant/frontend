
const STORE_URLS = {
  create: () => `/stores`, 
  update: (storeId: string) => `/stores/${storeId}`,
  get: () => `/stores/me`,
  getStats: () => `/stores/me/stats`,
}
export default STORE_URLS 