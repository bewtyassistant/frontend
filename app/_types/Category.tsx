export default interface Category {
  category: "service" | "product"
  id: string
  name: string
  type: "default" | "custom"
  _id: string
}
