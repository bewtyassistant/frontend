"use client"
import localforage from "localforage"
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"

export const AuthContext = createContext<{
  token: string | null
  isLoggedIn: boolean
  loading: boolean
}>({
  isLoggedIn: false,
  token: null,
  loading: true
})

export default function AuthProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localforage
      .getItem("BA_TOKEN")
      .then((val) => {
        setIsLoggedIn(true)
        setToken(val as typeof token)
        setLoading(false)
      })
      .catch((err) => {
        setIsLoggedIn(false)
        setLoading(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
