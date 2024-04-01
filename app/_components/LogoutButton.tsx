import { Button } from "@chakra-ui/react"
import localforage from "localforage"
import { useRouter } from "next/navigation"
import { ReactNode, useCallback } from "react"
import STORAGE_KEYS from "../STORAGE_KEYS"
import { useAppDispatch } from "../_redux/store"
import { logout as logoutOfState } from "../_redux/auth.slice"
import { clearStore } from "../_redux/store.slice"

export default function LogoutButton({
  children,
  onLogout,
}: {
  children: ReactNode | ReactNode[]
  onLogout?: () => void
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const logout = useCallback(async () => {
    Promise.all(
      Object.keys(STORAGE_KEYS).map(
        async (key) => await localforage.removeItem(key)
      )
    )
      .then(() => {
        router.push("/")
        if (typeof onLogout === "function") onLogout()
        dispatch(logoutOfState())
        dispatch(clearStore())
      })
      .catch(console.log)
  }, [onLogout, router, dispatch])

  return (
    <Button
      _hover={{ bg: "transparent" }}
      _focus={{ border: "", boxShadow: "none", outline: "0" }}
      flexGrow="1"
      w="max-content"
      bg="transparent"
      h="unset"
      onClick={logout}
    >
      {children}
    </Button>
  )
}
