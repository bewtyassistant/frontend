"use client"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect } from "react"

export default function useRedirectToHomeIfNotLoggedIn({
  isLoggedIn,
  loading,
}: {
  isLoggedIn: boolean
  loading: boolean
}) {
  const router = useRouter()
  const redirect = useCallback(() => {
    if (!loading && !isLoggedIn) router.push("/")
  }, [router, isLoggedIn, loading])

  useEffect(() => {
    redirect()
  }, [redirect])
}
