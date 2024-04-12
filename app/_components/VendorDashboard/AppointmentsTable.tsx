import { Flex, Box, Text } from "@chakra-ui/react"
import AppTable from "../AppTable"
import DashboardHeading from "./DashboardHeading"

export default function AppointmentsTable() {
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
        >
          View all
        </Text>
      </Flex>
      <AppTable
        loading
        headings={[
          "Customer name",
          "Date",
          "Time",
          "Services booked",
          "Required products",
          "Amount",
          "",
        ]}
        tableData={[
          [
            "Customer name",
            "Delivery date",
            "Delivery time",
            "Product name",
            "Product price",
            "Amount",
            "",
          ],
          [
            "Customer name",
            "Delivery date",
            "Delivery time",
            "Product name",
            "Product price",
            "",
          ],
        ]}
      />
    </Box>
  )
}