import { VStack, Flex } from "@chakra-ui/react"
import StatisticCard from "../Dashboard/StatisticCard"
import Store, { StoreType } from "@/app/_types/Store"
import DashboardHeading from "../Dashboard/DashboardHeading"
import { IStoreMetrics } from "@/app/_types/IStoreState"

export default function DashboardStats({
  heading,
  storeType,
  loading,
  totalEarningsOnProducts,
  totalNumberOfFulfilledAppointments,
  totalNumberOfClientsServiced,
  totalNumberOfLocationsDeliveredTo,
  totalNumberOfProductsSold,
  totalSaloonEarnings,
}: {
  loading?: boolean
  heading?: string
  storeType: StoreType
} & IStoreMetrics) {
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
          heading={(
            (storeType === StoreType.service
              ? totalSaloonEarnings
              : totalEarningsOnProducts) || 0
          ).toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          })}
          text={"Total earnings"}
          loading={loading}
        />
        <StatisticCard
          bg="#62BEC11A"
          color="#62BEC1"
          maxW={{ base: "49%", sm: "30%" }}
          flexGrow="1"
          heading={
            (storeType === StoreType.service
              ? totalNumberOfFulfilledAppointments
              : totalNumberOfProductsSold) || 0
          }
          text={
            storeType === StoreType.service
              ? "Total appointments"
              : "Total products sold"
          }
          loading={loading}
        />
        <StatisticCard
          bg="#F8F8F8"
          color="#9FA3AD"
          maxW={{ base: "49%", sm: "30%" }}
          flexGrow="1"
          heading={
            (storeType === StoreType.service
              ? totalNumberOfClientsServiced
              : totalNumberOfLocationsDeliveredTo) || 0
          }
          text={
            storeType === StoreType.service
              ? "Clients serviced"
              : "Locations delivered to"
          }
          loading={loading}
        />
      </Flex>
    </VStack>
  )
}
