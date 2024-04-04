import { usePathname, useRouter } from "next/navigation"
import { useCallback, useContext, useEffect } from "react"
import { AuthContext } from "../_providers/auth"

export default function useRedirectToCorrectDashboardIfLoggedIn() {
  const pathname = usePathname()
  const { isLoggedIn, user } = useContext(AuthContext)
  const router = useRouter()

  const redirect = useCallback(() => {
    if (isLoggedIn) {
      if (user?.accountType === "client" && pathname.startsWith("/vendor"))
        router.push(`/client/${pathname.split("/vendor").join("")}`)
      if (user?.accountType === "vendor" && pathname.startsWith("/client"))
        router.push(`/vendor/${pathname.split("/client").join("")}`)
    }
  }, [router, isLoggedIn, pathname, user?.accountType])

  useEffect(() => {
    redirect()
  }, [redirect])
}
