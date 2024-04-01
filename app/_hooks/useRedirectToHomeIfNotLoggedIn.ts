"use client"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

export default function useRedirectToHomeIfNotLoggedIn({
  isLoggedIn,
  loading,
}: {
  isLoggedIn: boolean
  loading: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()

  const redirect = useCallback(() => {
    const isProtectedRoute =
      pathname.startsWith("/client") || pathname.startsWith("/vendor")
    if (!loading && !isLoggedIn && isProtectedRoute) router.push("/")
  }, [router, isLoggedIn, loading, pathname])

  useEffect(() => {
    redirect()
  }, [redirect])
}
