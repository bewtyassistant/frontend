
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

export default function useRedirectFromOnboardingSubPagesIfNoStoreIsCreated() {
  const router = useRouter()
  const redirect = useCallback(() => {
    if (sessionStorage.getItem("BA_USER_STORE") === null) router.push("/onboarding")
  }, [router])
  useEffect(() => {
    redirect()
  }, [redirect])
}
