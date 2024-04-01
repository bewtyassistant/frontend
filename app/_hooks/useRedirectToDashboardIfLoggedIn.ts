import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import User from "../_types/User"

export default function useRedirectToDashboardIfLoggedIn({
  loading,
  isLoggedIn,
  user,
}: {
  loading: boolean
  isLoggedIn: boolean
  user: User | null
}) {
  const pathname = usePathname()
  const router = useRouter()

  const redirect = useCallback(() => {
    if (!loading && isLoggedIn) {
      if (user?.accountType === "client" && !pathname.startsWith("/client"))
        router.push(`/client`)
      if (
        user?.accountType === "vendor" &&
        !pathname.startsWith("/vendor") &&
        !pathname.startsWith("/onboarding")
      )
        router.push(`/vendor`)
    }
  }, [router, isLoggedIn, loading, user?.accountType, pathname])

  useEffect(() => {
    redirect()
  }, [redirect])
}
