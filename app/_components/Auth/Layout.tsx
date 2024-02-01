import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import AppLogo from "../AppLogo"
import { ReactNode } from "react"

export default function AuthLayout({
  headingText,
  subHeadingText,
  children
}: {
  headingText: string
  subHeadingText?: string
  children: ReactNode | ReactNode[]
}) {
  return (
    <>
      <Flex
        pos="relative"
        minH="100dvh"
        w="100dvw"
        justifyContent="center"
        alignItems={{ base: "center", lg: "stretch" }}
      >
        <Box as={Link} href="/" pos="absolute" top="3.4rem" left="3.2rem" zIndex="2">
          <AppLogo />
        </Box>
        <Box
          zIndex="1"
          minH="100%"
          w={{ base: "full", lg: "50%" }}
          flexShrink="0"
          bgRepeat="no-repeat"
          bgPos="center"
          bgSize={{ base: "contain", sm: "auto", lg: "56rem 66.2rem" }}
          bgImage="url(/images/auth-bg.png)"
          bgColor="brand.main"
          pos={{ base: "absolute", lg: "relative" }}
          filter={{ base: "brightness(.4)" , lg: "none" }}
        ></Box>
        <Flex
          w={{ base: "95dvw", lg: "50%" }}
          flexShrink="0"
          boxShadow={{ base: "0 0 20px #0000002e", lg: "none" }}
          backdropFilter={{ base: "blur(3px)", lg: "none" }}
          background={{
            base: "#ffffff6e",
            lg: "white",
          }}
          zIndex="3"
          minH="80dvh"
          maxW={{ base: "60rem", lg: "initial" }}
          py={{ base: "4rem" }}
          px="3rem"
          rounded={{ base: "1.2rem", lg: "0" }}
          color={{ base: "white", lg: "dark.100" }}
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap={{ base: "5rem", lg: "10rem" }}
        >
          <Flex gap=".8rem" flexDir="column" textAlign="center">
            <Heading fontSize={{ base: "4xl", lg: "6xl" }} color="inherit">
              {headingText}
            </Heading>
            {subHeadingText && <Text maxW="32.5rem" color={{ base: "white", lg: "gray.400" }} fontSize="1.6rem">{subHeadingText}</Text>}
          </Flex>
          <Flex justifyContent="center" w="full">{children}</Flex>
        </Flex>
      </Flex>
    </>
  )
}
