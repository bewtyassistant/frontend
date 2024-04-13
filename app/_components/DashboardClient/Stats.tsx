import { VStack, Flex } from "@chakra-ui/react"
import StatisticCard from "../Dashboard/StatisticCard"
import { StoreType } from "@/app/_types/Store"
import DashboardHeading from "../Dashboard/DashboardHeading"
import User from "@/app/_types/User"

export default function DashboardStats({
  heading,
  loading,
  user,
  statsType,
}: {
  loading?: boolean
  heading?: string
  user: User | null
  statsType: StoreType.product | StoreType.service
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
          heading={(user?.totalExpenses || 0).toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          })}
          text={"Total expenses"}
          loading={loading}
        />
        <StatisticCard
          bg="#62BEC11A"
          color="#62BEC1"
          maxW={{ base: "49%", sm: "30%" }}
          flexGrow="1"
          heading={
            (statsType === StoreType.service
              ? user?.totalAppointments
              : user?.totalProductsBought) || 0
          }
          text={
            statsType === StoreType.service
              ? "Total appointments"
              : "Total products bought"
          }
          loading={loading}
        />
        <StatisticCard
          bg="#F8F8F8"
          color="#9FA3AD"
          maxW={{ base: "49%", sm: "30%" }}
          flexGrow="1"
          heading={
            (statsType === StoreType.service
              ? user?.salonsVisited
              : user?.vendorsPatronised) || 0
          }
          text={
            statsType === StoreType.service
              ? "Salons visited"
              : "Vendors patronised"
          }
          loading={loading}
        />
      </Flex>
    </VStack>
  )
}
