import localforage from "localforage"
import { ReactNode, createContext, useEffect, useState } from "react"

export const AuthContext = createContext<{
  token: string | null
  isLoggedIn: boolean
}>({
  isLoggedIn: false,
  token: null,
})

export default function AuthProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    localforage
      .getItem("BA_TOKEN")
      .then((val) => {
        setIsLoggedIn(true)
        setToken(val as typeof token)
      })
      .catch((err) => {
        setIsLoggedIn(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, token }}>
      {children}
    </AuthContext.Provider>
  )
}
