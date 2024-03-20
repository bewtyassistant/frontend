"use client"
import { Box, Flex, Heading, Link } from "@chakra-ui/react"
import AppLogo from "./_components/AppLogo"
import { SubmitButton } from "./_components/Auth/Inputs"
import Image from "next/image"

export default function AuthLayout() {
  return (
    <>
      <Flex
        textAlign="center"
        pos="relative"
        minH="100dvh"
        w="`100dvw"
        pr={{ base: "0", lg: "10%" }}
        gap="2.5rem"
        justifyContent="center"
        alignItems={{ base: "center", lg: "flex-end" }}
        flexWrap="wrap"
        bgRepeat="no-repeat"
        bgPos={{ base: "center 45%", lg: "6.4%" }}
        bgSize={{
          md: "39.6rem 45rem",
          lg: "56rem 66.2rem",
        }}
        bgImage={{ lg: "url(/images/auth-bg.png)" }}
        bgColor="brand.main"
        flexDir="column"
      >
        <Box
          as={Link}
          href="/"
          pos="absolute"
          top="3.4rem"
          left="3.2rem"
          zIndex="2"
        >
          <AppLogo />
        </Box>
        <Heading
          w={{ base: "100%", lg: "50%" }}
          fontSize={{ base: "5xl", lg: "8xl" }}
          color="white"
        >
          Welcome to Bewty Assistant
        </Heading>
        <Box display={{ lg: "none" }}>
          <Image alt="" src="/images/auth-bg.png" width={300} height={453} />
        </Box>
        <Flex
          // mt={{ base: "18rem", lg: 0 }}
          flexShrink="0"
          flexDir="column"
          alignItems="center"
          w={{ base: "100%", lg: "50%" }}
          gap={{ base: "1rem", lg: "1.5rem" }}
          mb={{ base: "20%", sm: "10%", lg: "0" }}
        >
          <SubmitButton
            as={Link}
            href="/login"
            bg="white"
            color="brand.main"
            maxW="40rem"
            w="85dvw"
            _hover={{ textDecor: "none", bg: "brand.400" }}
          >
            Login
          </SubmitButton>
          <SubmitButton
            as={Link}
            href="/signup"
            bg="white"
            color="brand.main"
            maxW="40rem"
            w="85dvw"
            _hover={{ textDecor: "none", bg: "brand.400" }}
          >
            Create an account
          </SubmitButton>
        </Flex>
      </Flex>
    </>
  )
}
