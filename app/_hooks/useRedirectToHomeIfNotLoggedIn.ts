"use client"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"

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
      pathname.startsWith("/client") ||
      pathname.startsWith("/vendor") ||
      pathname.startsWith("/onboarding")
    if (isProtectedRoute && !isLoggedIn && loading === false) {
      router.push("/")
      toast.error("You are logged out!")
    }
  }, [router, isLoggedIn, loading, pathname])

  useEffect(() => {
    redirect()
  }, [redirect])
}
