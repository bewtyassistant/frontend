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
  const { fetchData, loading: isFetching } = useAxios()
  const checkStatus = useCallback(async () => {
    try {
      if (token || user || isLoggedIn) return setLoading(false)
      const tokenInStorage: string | null = await localforage.getItem(
        STORAGE_KEYS.BA_TOKEN
      )
      if (!tokenInStorage) {
        setLoading(false)
        return dispatch(logout())
      }
      if (isFetching) return
      const res = await fetchData({
        url: `/me`,
        method: "get",
      })
      if (res?.statusCode === 200) {
        await localforage.setItem(STORAGE_KEYS.BA_USER, res.user)
        dispatch(
          setAuth({
            user: res.user as User,
            token: tokenInStorage as string,
            isLoggedIn: true,
          })
        )
      } else {
        throw new Error("Your session has expired. Please login")
      }
      setLoading(false)
    } catch (err) {
      await localforage.removeItem(STORAGE_KEYS.BA_TOKEN)
      dispatch(logout())
      setLoading(false)
    }
  }, [dispatch, isLoggedIn, fetchData, token, user, isFetching])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
