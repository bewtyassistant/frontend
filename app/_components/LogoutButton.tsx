import { Button } from "@chakra-ui/react";
import localforage from "localforage";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";


export default function LogoutButton({ children, onLogout }: {
  children: ReactNode | ReactNode[]
  onLogout?: () => void
}){

  const router = useRouter()
  const logout = useCallback(async () => {
    await localforage.removeItem("BA_TOKEN")
    if(typeof onLogout === "function") onLogout()
    router.push("/")
  }, [onLogout])

  return (
    <Button _hover={{ bg: "transparent" }} _focus={{ border:"", boxShadow: "none", outline: "0"}} flexGrow="1" w="max-content" bg="transparent" h="unset" onClick={logout}>
      {children}
    </Button>
  )
}