import { Box, Flex, IconButton } from "@chakra-ui/react"
import { LegacyRef, ReactNode, RefObject } from "react"
import MenuIcon from "@/app/_assets/MenuIcon"
import NotificationButton from "../NotificationButton"
import MessageButton from "../MessageButton"

export default function MobileHeader({
  children,
  toggleButtonRef,
  toggleSideBar,
}: {
  children: ReactNode | ReactNode[]
  toggleButtonRef?: RefObject<HTMLButtonElement | null>
  toggleSideBar: () => void
}) {
  return (
    <Flex
      backgroundColor="brand.380"
      alignItems="center"
      minH="6.4rem"
      px="2rem"
    >
      <Box flexGrow="1">{children}</Box>
      <Flex alignItems="center" gap="1.6rem">
        <NotificationButton />
        <MessageButton />
        <IconButton
          onClick={toggleSideBar}
          ref={toggleButtonRef as LegacyRef<HTMLButtonElement>}
          aria-label="toggle-menu"
          color="brand.main"
          bg="transparent"
          ml=".5rem"
        >
          <MenuIcon />
        </IconButton>
      </Flex>
    </Flex>
  )
}
