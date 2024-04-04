
const STORE_URLS = {
  create: () => `/stores`, 
  update: (storeId: string) => `/stores/${storeId}`,
  get: () => `/stores/me`,
}
export default STORE_URLS 