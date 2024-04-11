import { Flex, Heading, Box, Text } from "@chakra-ui/react"
import AppTable from "../AppTable"
import DashboardHeading from "./DashboardHeading"

export default function ProductOrdersTable({ loading }: { loading?: boolean }) {
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
        <DashboardHeading>Product orders</DashboardHeading>
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
        loading={loading}
        headings={[
          "Customer name",
          "Delivery date",
          "Delivery time",
          "Product name",
          "Product price",
          "",
        ]}
        tableData={[
          [
            "Customer name",
            "Delivery date",
            "Delivery time",
            "Product name",
            "Product price",
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
