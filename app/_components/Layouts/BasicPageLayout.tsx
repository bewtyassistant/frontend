import { VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function BasicPageLayout({ children }: { children: ReactNode }) {
  return (
    <VStack alignItems="stretch" gap={{ base: "2.4rem", md: "2rem" }}>
      {children}
    </VStack>
  )
}
