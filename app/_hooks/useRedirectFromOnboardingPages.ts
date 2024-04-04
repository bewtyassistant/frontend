
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import STORAGE_KEYS from "../STORAGE_KEYS"

export default function useRedirectFromOnboardingSubPagesIfNoStoreIsCreated() {
  const router = useRouter()
  const redirect = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEYS.BA_USER_STORE) === null) router.push("/onboarding")
  }, [router])
  useEffect(() => {
    redirect()
  }, [redirect])
}
