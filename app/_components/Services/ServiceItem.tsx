import EditIcon from "@/app/_assets/EditIcon"
import { Box, Flex, Text } from "@chakra-ui/react"

export default function ServiceItem() {
  return (
    <>
      <Flex
        fontSize={{ base: "1.4rem", md: "2rem" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>Retouching of virgin hair with salon products</Text>
        <Text display="flex" alignItems="center" gap="1.6rem">
          <Text as="span" className="naira">
            1000
          </Text>
          <Text as="button">
            <EditIcon />
          </Text>
        </Text>
      </Flex>
    </>
  )
}
