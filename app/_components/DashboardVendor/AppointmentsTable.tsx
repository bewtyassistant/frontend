import { Flex, Box, Text } from "@chakra-ui/react"
import AppTable from "../AppTable"
import DashboardHeading from "../Dashboard/DashboardHeading"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

export default function AppointmentsTable({
  tableData,
  loading,
  isClient,
}: {
  loading?: boolean
  tableData: ReactNode[][]
  isClient?: boolean
}) {
  const router = useRouter()
  if (!loading && tableData.length === 0) return null
  return (
    <Box
      overflow="auto"
      position="relative"
      zIndex="0"
      className="styled-scrollbar"
      pb="3rem"
    >
      <Flex
        pos="sticky"
        left="0"
        justifyContent="space-between"
        w="full"
        alignItems="center"
        mb="1.5rem"
        zIndex="0"
      >
        <DashboardHeading>Appointments</DashboardHeading>
        <Text
          as="button"
          color="brand.main"
          fontSize="1.6rem"
          lineHeight="1.8rem"
          onClick={() =>
            router.push(
              isClient ? "/client/appointments" : "/vendor/appointments"
            )
          }
        >
          View all
        </Text>
      </Flex>
      <AppTable
        loading={loading}
        headings={[
          isClient ? "Vendor name" : "Customer name",
          "Date",
          "Time",
          "Services booked",
          "Required products",
          "Amount",
          "Status",
        ]}
        tableData={tableData.slice(0, 5)}
      />
    </Box>
  )
}
