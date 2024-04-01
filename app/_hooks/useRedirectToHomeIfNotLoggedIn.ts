import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect } from "react"
import { AuthContext } from "../_providers/auth"

export default function useRedirectToHomeIfNotLoggedIn() {
  const { isLoggedIn, loading } = useContext(AuthContext)
  const router = useRouter()

  const redirect = useCallback(() => {
    if (!loading && !isLoggedIn) router.push("/")
  }, [router, isLoggedIn, loading])

  useEffect(() => {
    redirect()
  }, [redirect])
}
