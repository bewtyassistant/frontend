import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import DashboardHeading from "./DashboardHeading"
import useGetAnimation from "@/app/_hooks/useGetAnimation"

export default function VendorNextBookedService({
  loading,
}: {
  loading?: boolean
}) {
  if (loading) return <Skeleton />
  return (
    <Box>
      <DashboardHeading mb="1.5rem">Next booked service</DashboardHeading>
      <Flex
        alignItems={{ md: "center" }}
        gap={{ base: "1.8rem", md: "4rem" }}
        flexWrap={{ base: "wrap", sm: "nowrap" }}
      >
        <Image
          src="/images/service-placeholder.png"
          w={{ base: "100%", sm: "50%" }}
          rounded=".4rem"
        />
        <VStack gap="1rem" alignItems="stretch">
          <KeyValuePair keyName="Date" value="15 / 01 / 2024" />
          <KeyValuePair keyName="Time" value="2:00 PM" />
          <KeyValuePair keyName="Client's name" value="Mrs. Jane Ezumezu" />
          <KeyValuePair keyName="Amount paid" value="N 20,000" />
          <KeyValuePair
            keyName="Services requested"
            value=" Retouching, fixing weavon, manicure and pedicure"
          />
        </VStack>
      </Flex>
    </Box>
  )
}

export function ClientNextBookedService() {
  return (
    <>
      <Flex>
        <Image src="/images/service-placeholder.png" />
        <KeyValuePair keyName="Date" value="15 / 01 / 2024" />
      </Flex>
    </>
  )
}

function KeyValuePair({
  keyName,
  value,
}: {
  keyName: string
  value: ReactNode
}) {
  return (
    <Text color="#9FA3AD" alignItems="center">
      <Text as="span" fontSize={{ base: "1.4rem", md: "2rem" }}>
        {keyName}: &nbsp;
      </Text>
      <Text as="span" fontSize={{ base: "1.4rem", md: "1.6rem" }}>
        {value}
      </Text>
    </Text>
  )
}

function Skeleton() {
  const pulseAnimation = useGetAnimation()

  return (
    <>
      <Box>
        <DashboardHeading mb="1.5rem">Next booked service</DashboardHeading>
        <Flex
          alignItems={{ sm: "center" }}
          gap={{ base: "1.8rem", md: "4rem" }}
          flexWrap={{ base: "wrap", sm: "nowrap" }}
        >
          <Image
            src="/images/service-placeholder-skeleton.png"
            w={{ base: "100%", sm: "50%" }}
            rounded=".4rem"
            opacity=".4"
            animation={pulseAnimation}
            objectFit="cover"
          />
          <VStack gap="1.5rem" alignItems="stretch">
            <KeyValuePairSkeleton />
            <KeyValuePairSkeleton />
            <KeyValuePairSkeleton />
            <KeyValuePairSkeleton />
            <KeyValuePairSkeleton />
          </VStack>
        </Flex>
      </Box>
    </>
  )
}
function KeyValuePairSkeleton() {
  const pulseAnimation = useGetAnimation()
  return (
    <Text
      animation={pulseAnimation}
      alignItems="center"
      display="flex"
      gap=".5rem"
    >
      <Text
        as="span"
        opacity=".1"
        bgColor="#9FA3AD"
        height="1.2rem"
        w="14rem"
        rounded="1.2rem"
      ></Text>
      <Text
        as="span"
        opacity=".1"
        bgColor="#9FA3AD"
        height=".8rem"
        w="15rem"
        rounded="17rem"
      ></Text>
    </Text>
  )
}
