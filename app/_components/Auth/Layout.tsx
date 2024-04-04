import { Box, Flex, FlexboxProps, Heading, Link, Text } from "@chakra-ui/react"
import AppLogo from "../AppLogo"
import { ReactNode } from "react"
import BackButton from "../BackButton"

export default function AuthLayout({
  headingText,
  subHeadingText,
  children,
  gap,
  showBackButton = false
}: {
  headingText: string
  subHeadingText?: string
  children: ReactNode | ReactNode[]
  gap?: FlexboxProps["gap"]
  showBackButton?: boolean
}) {
  return (
    <>
      <Flex
        pos="relative"
        maxH={{ lg: "100dvh" }}
        overflow={{ lg: "hidden" }}
        w="100dvw"
        justifyContent="center"
        alignItems={{ base: "center", lg: "stretch" }}
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
        <Box
          zIndex="1"
          minH="100%"
          w={{ base: "full", lg: "50%" }}
          flexShrink="0"
          bgRepeat="no-repeat"
          bgPos={{ base: "center 50px", lg: "center" }}
          bgSize={{ base: "contain", sm: "33rem 44rem", lg: "56rem 66.2rem" }}
          bgImage={{
            base: "url(/images/auth-bg-mobile.png)",
            md: "url(/images/auth-bg.png)",
          }}
          bgColor="brand.main"
          pos={{ base: "absolute", lg: "sticky" }}
          maxH={{ lg: "100dvh" }}
        ></Box>
        <Flex
          h={{ lg: "100dvh" }}
          overflow="auto"
          w={{ base: "90dvw", lg: "50%" }}
          mt={{ base: "18rem", lg: 0 }}
          flexShrink="0"
          boxShadow={{ base: "0 0 20px #0000002e", lg: "none" }}
          backdropFilter={{ base: "blur(3px)", lg: "none" }}
          background="white"
          mb="4rem"
          zIndex="3"
          minH="76dvh"
          maxW={{ base: "40rem", lg: "initial" }}
          pt={{ base: "7rem" }}
          pb={{ base: "3.2rem" }}
          px="3rem"
          color="dark.100"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap={gap || { base: "3rem", lg: "10rem" }}
        >
          <Flex gap=".8rem" flexDir="column" textAlign="center" w="full" maxW="40rem">
          {showBackButton && (
            <Box mr="auto" mb="4rem">
              <BackButton />
            </Box>
          )}
            <Heading
              letterSpacing={{ base: "-.5px", md: "unset" }}
              fontSize={{ base: "4xl", lg: "6xl" }}
              color="inherit"
            >
              {headingText}
            </Heading>
            {subHeadingText && (
              <Text mx="auto" maxW="34rem" color="gray.400" fontSize="1.6rem">
                {subHeadingText}
              </Text>
            )}
          </Flex>
          <Flex
            justifyContent="center"
            w="full"
            mb={{ base: "auto", lg: "0" }}
            mt="1rem"
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
