import { ReactNode } from "react"
import DesktopHeader from "./DesktopHeader"
import DesktopSideBar from "./DesktopSideBar"
import { Box, Flex } from "@chakra-ui/react"
import NewAppointmentModal from "../Modals/NewAppointmentModal"

export default function DesktopLayout({
  children,
  headerChildren,
  sidebarChildren,
}: {
  children: ReactNode | ReactNode[]
  headerChildren: ReactNode | ReactNode[]
  sidebarChildren: {
    header: ReactNode | ReactNode[]
    body: ReactNode | ReactNode[]
  }
}) {
  return (
    <>
      <Flex flexDir="column" position="relative">
        <Box position="sticky" top="0" bg="white" zIndex="100">
          <DesktopHeader>{headerChildren}</DesktopHeader>
        </Box>
        <Box
          top="9.5rem"
          bottom=".8rem"
          position="fixed"
          w="22%"
          flexShrink="0"
          flexGrow="0"
          pt=".8rem"
          px=".8rem"
        >
          <DesktopSideBar
            header={sidebarChildren.header}
            body={sidebarChildren.body}
          />
        </Box>
        <Box
          flexShrink="0"
          flexGrow="0"
          ml="22%"
          w="78%"
          minH="100dvh"
          py="6rem"
          px="4rem"
        >
          {children}
        </Box>
      </Flex>
      <NewAppointmentModal />
    </>
  )
}
