import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"
import DashboardHeading from "./DashboardHeading"
import useGetAnimation from "@/app/_hooks/useGetAnimation"
import Appointment from "@/app/_types/Appointment"

export default function NextBookedService({
  loading,
  nextBookedService,
  isVendor,
}: {
  loading?: boolean
  nextBookedService: Appointment | null
  isVendor: boolean
}) {
  if (!loading && !nextBookedService) return null
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
          alt=""
          src="/images/service-placeholder.png"
          w={{ base: "100%", sm: "50%" }}
          rounded=".4rem"
        />
        <VStack gap="1rem" alignItems="stretch">
          <KeyValuePair
            keyName="Date"
            value={new Date(nextBookedService?.bookedDate || "").toDateString()}
          />
          <KeyValuePair
            keyName="Time"
            value={new Date(
              nextBookedService?.bookedDate || ""
            ).toLocaleTimeString("en-NG", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
          {isVendor ? (
            <KeyValuePair
              keyName="Client's name"
              value={`${nextBookedService?.client?.firstName} ${nextBookedService?.client?.lastName}`}
            />
          ) : (
            <>
              <KeyValuePair
                keyName="Salon name"
                value={`${nextBookedService?.vendor?.name}`}
              />
              <KeyValuePair
                keyName="Salon address"
                value={`${nextBookedService?.vendor?.address}`}
              />
              <KeyValuePair
                keyName="Landmark"
                value={`${nextBookedService?.vendor?.nearestLandmark}`}
              />
              <KeyValuePair
                keyName="Salon Contact nos"
                value={`${nextBookedService?.vendor?.primaryContactNumbers?.join(
                  ", "
                )}`}
              />
            </>
          )}
          {isVendor && (
            <KeyValuePair
              keyName="Amount paid"
              value={nextBookedService?.totalCost}
            />
          )}
          <KeyValuePair
            keyName={"Services requested"}
            value={nextBookedService?.services?.join(", ")}
          />
        </VStack>
      </Flex>
    </Box>
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
            alt=""
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
