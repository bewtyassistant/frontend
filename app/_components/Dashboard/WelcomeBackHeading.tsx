import StarIcon from "@/app/_assets/StarIcon"
import store from "@/app/_urls/store"
import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function WelcomeBackHeading({ name }: { name: ReactNode }) {
  return (
    <Flex
      as="h1"
      alignItems="center"
      lineHeight={{ base: "2.2rem", sm: "3.6rem" }}
      fontSize={{ base: "2rem", sm: "3.2rem" }}
      gap=".5rem"
      color="brand.main"
      mt={{ base: "1.5rem" }}
      mb={{ base: "3rem", sm: "5rem" }}
    >
      Welcome Back {name}!
      <Flex gap="1.1rem" as="span" color="transparent">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </Flex>
    </Flex>
  )
}
