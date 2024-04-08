export default interface User {
  accountType: AccountTypes
  email: string
  firstName: string
  id: string
  isEmailVerified: boolean
  lastName: string
  password: string
  __v: 0
  _id: string
}

export enum AccountTypes  {
  CLIENT = "client",
  VENDOR = "vendor"
}