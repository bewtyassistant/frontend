import { Box, VStack } from "@chakra-ui/react";
import NavLinkComponent from "../Navigation/NavLink";
import { NavLink } from "@/app/_data/navLinks";


export default function NavLinksMapper({ links, onClose }: {
  links: NavLink[]
  onClose?: () => void
}){
  return (
    <VStack as="ul" alignItems="start" gap="3rem" listStyleType="none">
      {links.map((link) => (
        <Box key={link.href} as="li">
          <NavLinkComponent
            onClick={onClose}
            name={link.name}
            href={link.href}
            icon={link.icon}
          />
        </Box>
      ))}
    </VStack>
  )
}