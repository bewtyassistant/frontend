import { Box, VStack } from "@chakra-ui/react"
import NavLogoutButton from "../NavLogoutButton"
import { NavLink } from "@/app/_data/navLinks"
import NavLinksMapper from "./NavLinksMapper"

export default function MobileSideBarContent({
  links,
}: {
  links: NavLink[]
}) {
  return (
    <VStack pl="3rem" w="full" alignItems="start" pt="4rem">
      <Box as="nav">
        <NavLinksMapper links={links} />
      </Box>
      <NavLogoutButton />
    </VStack>
  )
}
