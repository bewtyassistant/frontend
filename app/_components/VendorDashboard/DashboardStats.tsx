import { VStack, Flex } from "@chakra-ui/react"
import StatisticCard from "../StatisticCard"
import { StoreType } from "@/app/_types/Store"
import DashboardHeading from "./DashboardHeading"

export default function DashboardStats({
  heading,
  storeType,
}: {
  heading?: string
  storeType: StoreType
}) {

  return (
    <VStack alignItems="stretch">
      {heading && <DashboardHeading mb="1.2rem">{heading}</DashboardHeading>}
      <Flex
        flexWrap={{ base: "wrap", sm: "nowrap" }}
        gap={{ base: "1rem", sm: "1.5rem" }}
      >
        <StatisticCard
          bg="#FFE3E780"
          color="brand.main"
          w={{ base: "100%", sm: "unset" }}
          maxW={{ base: "100%", sm: "40%" }}
          flexGrow="1"
          heading={"N 100,000"}
          text={"Total earnings"}
          loading
        />
        <StatisticCard
          bg="#62BEC11A"
          color="#62BEC1"
          maxW={{ base: "49%", sm: "30%" }}
          flexGrow="1"
          heading={"50"}
          text={
            storeType === StoreType.service
              ? "Total appointments"
              : "Total products sold"
          }
          loading
        />
        <StatisticCard
          bg="#F8F8F8"
          color="#9FA3AD"
          maxW={{ base: "49%", sm: "30%" }}
          flexGrow="1"
          heading={"40"}
          text={
            storeType === StoreType.service
              ? "Clients serviced"
              : "Locations delivered to"
          }
          loading
        />
      </Flex>
    </VStack>
  )
}
