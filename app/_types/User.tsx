export default interface User {
  accountType: "vendor" | "client"
  email: string
  firstName: string
  id: string
  isEmailVerified: boolean
  lastName: string
  password: string
  __v: 0
  _id: string
}
