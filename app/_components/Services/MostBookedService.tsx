import { Image, Text, VStack } from "@chakra-ui/react"

export default function MostBookedService({
  serviceName,
  serviceImage,
}: {
  serviceName: string
  serviceImage: string
}) {
  return (
    <>
      <VStack as="figure" gap="1.2rem" alignItems="start">
        <Image
          src={serviceImage}
          alt="most booked service"
          h="28.6rem"
          w="full"
          objectFit="cover"
        />
        <Text color="#9FA3AD" fontSize={{ base: "1.4rem", md: "2rem" }}>
          Most booked service - {serviceName}
        </Text>
      </VStack>
    </>
  )
}
