import { Box, Image, Text, VStack } from "@chakra-ui/react"
import Loader from "../Loader"
import { LoaderIcon } from "react-hot-toast"

export default function MostBookedService({
  serviceName,
  serviceImage,
  loading,
}: {
  loading: boolean
  serviceName?: string
  serviceImage?: string
}) {
  if (loading || !serviceName)
    return (
      <VStack
        h="28.6rem"
        w="full"
        alignItems="center"
        justifyContent="space-between"
        fontSize={{ base: "1.4rem", md: "2rem" }}
      >
        <Box my="auto">
          {!serviceName ? (
            <Text>No Data for most booked service yet</Text>
          ) : (
            <LoaderIcon
              style={{
                width: 75,
                height: 75,
              }}
            />
          )}
        </Box>
        <Text alignSelf="start" color="#9FA3AD">
          Most booked service - {serviceName}
        </Text>
      </VStack>
    )
  return (
    <>
      <VStack as="figure" gap="1.2rem" alignItems="start">
        <Image
          src={
            "https://images.unsplash.com/photo-1617391654484-2894196c2cc9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="most booked service"
          h="28.6rem"
          w="full"
          objectFit="cover"
          borderRadius="4px"
        />
        <Text color="#9FA3AD" fontSize={{ base: "1.4rem", md: "2rem" }}>
          Most booked service - {serviceName}
        </Text>
      </VStack>
    </>
  )
}
