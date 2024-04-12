import { VStack } from "@chakra-ui/react"
import BestSellingProductsSection from "./BestSellingProductsSection"
import DashboardStats from "./DashboardStats"
import ProductOrdersTable from "./ProductOrdersTable"
import Store, { StoreType } from "@/app/_types/Store"

export default function ProductVendorDashboard({
  loading,
  store,
}: {
  loading?: boolean
  store: Store | null
}) {
  if (store && store.type === StoreType.service) return null
  return (
    <VStack alignItems="stretch" gap={{ base: "3rem", md: "5rem" }}>
      <DashboardStats
        loading={loading}
        heading="Shop"
        storeType={StoreType.product}
        store={store}
      />
      <BestSellingProductsSection loading={loading} />
      <ProductOrdersTable loading={loading} />
    </VStack>
  )
}
