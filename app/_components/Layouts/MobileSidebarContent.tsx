import { Box, VStack } from "@chakra-ui/react"
import MessageButton from "../MessageButton"
import NavLogoutButton from "../NavLogoutButton"
import NotificationButton from "../NotificationButton"
import { NavLink } from "@/app/_data/navLinks"
import NavLinkComponent from "../Navigation/NavLink"
import NavLinksMapper from "./NavLinksMapper"

export default function MobileSideBarContent({
  onClose,
  links,
}: {
  onClose?: () => void
  links: NavLink[]
}) {
  return (
    <VStack pl="3rem" w="full" alignItems="start" gap="5rem">
      <VStack alignItems="start" gap="2rem">
        <NotificationButton />
        <MessageButton />
      </VStack>
      <Box as="nav">
        <NavLinksMapper links={links}/>
      </Box>
      <NavLogoutButton />
    </VStack>
  )
}
