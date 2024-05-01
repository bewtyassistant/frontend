import { Flex, Box, Text } from "@chakra-ui/react"
import AppTable from "../AppTable"
import DashboardHeading from "../Dashboard/DashboardHeading"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

export default function ProductOrdersTable({
  loading,
  tableData,
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
        <DashboardHeading>Product orders</DashboardHeading>
        <Text
          as="button"
          color="brand.main"
          fontSize="1.6rem"
          lineHeight="1.8rem"
          onClick={() =>
            router.push(isClient ? "/client/orders" : "/vendor/orders")
          }
        >
          View all
        </Text>
      </Flex>
      <AppTable
        loading={loading}
        headings={[
          isClient ? "Vendor name" : "Customer name",
          "Delivery date",
          "Delivery time",
          "Product name",
          "Product quantity",
          "Price",
          "Status",
        ]}
        tableData={tableData.slice(0)}
      />
    </Box>
  )
}
