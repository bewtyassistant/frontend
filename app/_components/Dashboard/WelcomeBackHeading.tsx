import StarIcon from "@/app/_assets/StarIcon"
import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export const pageHeadingStyles = {
  alignItems: "center",
  lineHeight: { base: "2.2rem", sm: "3.6rem" },
  fontSize: { base: "2rem", sm: "3.2rem" },
  gap: ".5rem",
  color: "brand.main",
  fontWeight: 400,
}

export default function WelcomeBackHeading({ name }: { name: ReactNode }) {
  return (
    <Flex
      as="h1"
      {...pageHeadingStyles}
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
