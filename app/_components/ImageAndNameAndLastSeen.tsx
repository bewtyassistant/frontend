import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react"
import { useAppSelector } from "../_redux/store"

export default function ImageAndNameAndLastSeen() {
  const { user } = useAppSelector((store) => store.auth)
  return (
    <>
      <Flex as="figure" alignItems="center" gap="1.2rem">
        <Avatar
          border="1px solid"
          borderColor="brand.main"
          width={{ base: "3.5rem", md: "4.8rem", lg: "6.4rem" }}
          height={{ base: "3.5rem", md: "4.8rem", lg: "6.4rem" }}
          bg="#62BEC11A"
          color="brand.main"
          name={`${user?.firstName || "Hello"} ${user?.lastName || "there"}`}
        />
        <VStack
          alignItems="start"
          as="figcaption"
          gap={{ base: ".4rem", md: "1rem" }}
        >
          <Text
            as="span"
            fontSize={{ base: "1.6rem", lg: "2rem" }}
            lineHeight={{ base: "1.8rem" }}
            color="dark.100"
          >
            {user?.firstName || "Hello"} {user?.lastName || "there"}
          </Text>
          <Text
            as="span"
            fontSize={{ base: "1.4rem" }}
            lineHeight={{ base: "1.6rem" }}
            color="gray.400"
          >
            Last seen 12:30
          </Text>
        </VStack>
      </Flex>
    </>
  )
}
