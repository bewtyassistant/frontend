import { VStack, Flex, Text } from "@chakra-ui/react";
import ServiceItem from "./ServiceItem";

export default function ServicesList(){
  return (
    <VStack gap="2rem" w="full" alignItems="stretch">
      <Flex
        fontSize={{ base: "1.4rem", md: "2rem" }}
        alignItems="center"
        justifyContent="space-between"
        color="brand.main"
      >
        <Text>Service</Text>
        <Text display="flex" alignItems="center" pr="4rem">
          Price
        </Text>
      </Flex>
      <ServiceItem></ServiceItem>
      <ServiceItem></ServiceItem>
      <ServiceItem></ServiceItem>
      <ServiceItem></ServiceItem>
      <ServiceItem></ServiceItem>
      <ServiceItem></ServiceItem>
      <ServiceItem></ServiceItem>
    </VStack>
  )
}