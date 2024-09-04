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
import useAxios from "../_hooks/useAxios"
import toast from "react-hot-toast"

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
  const { fetchData } = useAxios()
  const checkStatus = useCallback(async () => {
    try {
      const token: string | null = await localforage.getItem(
        STORAGE_KEYS.BA_TOKEN
      )
      if (!token || isLoggedIn) return setLoading(false)
      const res = await fetchData({
        url: `/me`,
        method: "get",
      })
      if (res.statusCode === 200) {
        await localforage.setItem(STORAGE_KEYS.BA_USER, res.user)
        dispatch(
          setAuth({
            user: res.user as User,
            token: token as string,
            isLoggedIn: true,
          })
        )
      } else {
        toast.error("Your session has expired. Please login.")
        await localforage.removeItem(STORAGE_KEYS.BA_TOKEN)
        dispatch(logout())
      }
      setLoading(false)
    } catch (err) {
      dispatch(logout())
      await localforage.removeItem(STORAGE_KEYS.BA_TOKEN)
      setLoading(false)
    }
  }, [dispatch, isLoggedIn, fetchData])
  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
