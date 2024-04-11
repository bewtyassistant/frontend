import { VStack } from "@chakra-ui/react"
import BestSellingProductsSection from "./BestSellingProductsSection"
import DashboardStats from "./DashboardStats"
import ProductOrdersTable from "./ProductOrdersTable"
import { StoreType } from "@/app/_types/Store"

export default function ProductVendorDashboard() {
  return (
    <VStack alignItems="stretch" gap={{ base: "3rem", md: "5rem" }}>
      <DashboardStats heading="Shop" storeType={StoreType.product} />
      <BestSellingProductsSection />
      <ProductOrdersTable />
    </VStack>
  )
}
