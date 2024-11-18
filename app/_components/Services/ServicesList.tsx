import { VStack, Flex, Text } from "@chakra-ui/react"
import ServiceItem from "./ServiceItem"
import Service, { VendorService } from "@/app/_types/Service"
import { LoaderIcon } from "react-hot-toast"

export default function ServicesList({
  services,
  loading,
}: {
  services: VendorService[]
  loading: boolean
}) {
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
      <>
        {loading ? (
          <LoaderIcon style={{ width: 75, height: 75, margin: "auto" }} />
        ) : (
          <>
            {services.map((service) => (
              <ServiceItem key={service._id} service={service} />
            ))}
            {services.length === 0 && !loading && (
              <Text
                textAlign="center"
                fontSize={{ base: "1.4rem", md: "2rem" }}
                mt="4rem"
              >
                You haven't added any services. <br />
                Services you add will appear here.
              </Text>
            )}
          </>
        )}
      </>
    </VStack>
  )
}
