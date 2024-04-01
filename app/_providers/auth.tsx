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
import { useAppDispatch, useAppSelector } from "../_redux/store"
import { logout, setAuth } from "../_redux/auth.slice"
import useRedirectToHomeIfNotLoggedIn from "../_hooks/useRedirectToHomeIfNotLoggedIn"

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
  const dispatch = useAppDispatch()
  const { isLoggedIn, token, user } = useAppSelector((store) => store.auth)
  const [loading, setLoading] = useState(true)
  useRedirectToHomeIfNotLoggedIn({ loading, isLoggedIn })

  const checkStatus = useCallback(async () => {
    try {
      const token: string | null = await localforage.getItem("BA_TOKEN")
      const user: User | null = await localforage.getItem("BA_USER")
      console.log(token, user)
      if (token) {
        dispatch(
          setAuth({
            user: user as User,
            token: token as string,
            isLoggedIn: true,
          })
        )
      }
    } catch (err) {
      // setIsLoggedIn(false)
      dispatch(logout())
    }
    setLoading(false)
  }, [dispatch])
  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
