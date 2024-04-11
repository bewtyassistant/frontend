import { Box, Flex, HStack, Link, Show, Text } from "@chakra-ui/react"
import BACopyright from "../_assets/BACopyright"
import AppLogo, { AppLogoSmall } from "./AppLogo"
import LinkedIn from "../_assets/LinkedIn"
import Instagram from "../_assets/Instagram"
import Facebook from "../_assets/Facebook"
import { ReactNode } from "react"

export default function AppFooter() {
  return (
    <>
      <Box
        as="footer"
        bg="brand.main"
        h="26.2rem"
        pos="sticky"
        top="100%"
        zIndex="100"
        pt={{ base: "1.5rem", sm: "2rem" }}
      >
        <Flex
          px="4rem"
          maxW={{ md: "80%" }}
          mx="auto"
          justify="space-between"
          alignItems="flex-start"
        >
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            alignItems={{ base: "start", sm: "center" }}
            gap={{ base: "3rem", sm: "6rem" }}
          >
            <Link href="/">
              <Show below="md">
                <AppLogoSmall
                  showText={false}
                  primaryColor="white"
                  secondaryColor="white"
                />
              </Show>
              <Show above="md">
                <AppLogo
                  showText={false}
                  primaryColor="white"
                  secondaryColor="white"
                />
              </Show>
            </Link>
            <Flex
              flexDir={{ base: "column", sm: "row" }}
              gap={{ base: "2.4rem", sm: "4rem" }}
            >
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy-policy">Privacy policy</FooterLink>
            </Flex>
          </Flex>
          <HStack gap={{ base: "1.6rem", sm: "2rem" }}>
            <FooterLink href="#">
              <LinkedIn />
            </FooterLink>
            <FooterLink href="#">
              <Instagram />
            </FooterLink>
            <FooterLink href="#">
              <Facebook />
            </FooterLink>
          </HStack>
        </Flex>
        <Flex
          py={{ base: "1rem", sm: "2rem" }}
          px="4rem"
          borderTop="1px solid #D6D8DC"
          justify={{ base: "start", md: "center" }}
          pos="sticky"
          top="100%"
        >
          <BACopyright />
        </Flex>
      </Box>
    </>
  )
}

function FooterLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Text
      as={Link}
      href={href}
      _hover={{ textDecor: "underline" }}
      color="white"
      fontSize="2rem"
      lineHeight="2.25rem"
    >
      {children}
    </Text>
  )
}
