"use client"
import localforage from "localforage"
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import User from "../_types/User"

export const AuthContext = createContext<{
  token: string | null
  isLoggedIn: boolean
  loading: boolean
  user: null | User
}>({
  isLoggedIn: false,
  token: null,
  loading: true,
  user: null,
})

export default function AuthProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = useCallback(async () => {
    try {
      const token: string | null = await localforage.getItem("BA_TOKEN")
      const user: User | null = await localforage.getItem("BA_USER")
      setUser(user)
      setToken(token)
      setIsLoggedIn(true)
    } catch (err) {
      setIsLoggedIn(false)
    }
    setLoading(false)
  }, [])
  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
