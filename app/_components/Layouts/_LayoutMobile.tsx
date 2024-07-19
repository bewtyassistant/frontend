"use client"
import { ReactNode, useRef, useState } from "react"
import MobileHeader from "./MobileHeader"
import { Box, Flex } from "@chakra-ui/react"
import MobileSideBar from "./MobileSideBar"
import NewAppointmentModal from "../Modals/NewAppointmentModal"

export default function MobileLayout({
  children,
  headerChildren,
  SidebarChildren,
}: {
  children: ReactNode | ReactNode[]
  headerChildren: ReactNode | ReactNode[]
  SidebarChildren: ({
    onClose,
  }: {
    onClose: () => void
  }) => ReactNode | ReactNode[]
}) {
  const [showDrawer, setShowDrawer] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)
  return (
    <>
      <Flex flexDir="column" position="relative">
        <Box position="sticky" top="0" bg="white" zIndex="100">
          <MobileHeader
            toggleSideBar={() => setShowDrawer((prev) => !prev)}
            toggleButtonRef={toggleButtonRef}
          >
            {headerChildren}
          </MobileHeader>
        </Box>
        <Box px="1.5rem" pt="3rem" pb="22rem">
          {children}
        </Box>
        <MobileSideBar
          isOpen={showDrawer}
          onClose={() => setShowDrawer((prev) => !prev)}
          placement="right"
          finalFocusRef={toggleButtonRef}
        >
          <SidebarChildren onClose={() => setShowDrawer((prev) => !prev)} />
        </MobileSideBar>
      </Flex>
      <NewAppointmentModal />
    </>
  )
}
