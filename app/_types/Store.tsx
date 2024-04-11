export enum StoreType {
  "product" = "product",
  "service" = "service",
  "productAndService" = "product-and-service",
}

export default interface Store {
  name: string
}
