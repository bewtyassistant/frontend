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
import useRedirectToDashboardIfLoggedIn from "../_hooks/useRedirectToDashboardIfLoggedIn"
import STORAGE_KEYS from "../STORAGE_KEYS"

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
  useRedirectToDashboardIfLoggedIn({ loading, isLoggedIn, user })

  const checkStatus = useCallback(async () => {
    try {
      const token: string | null = await localforage.getItem(
        STORAGE_KEYS.BA_TOKEN
      )
      const user: User | null = await localforage.getItem(STORAGE_KEYS.BA_USER)
      if (token) {
        dispatch(
          setAuth({
            user: user as User,
            token: token as string,
            isLoggedIn: true,
          })
        )
      }
      setLoading(false)
    } catch (err) {
      dispatch(logout())
      setLoading(false)
    }
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
