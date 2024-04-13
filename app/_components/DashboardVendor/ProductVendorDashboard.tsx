import { VStack } from "@chakra-ui/react"
import DashboardProductsSection from "../Dashboard/DashboardProductsSection"
import DashboardStats from "./Stats"
import ProductOrdersTable from "./ProductOrdersTable"
import Store, { StoreType } from "@/app/_types/Store"
import Order from "@/app/_types/Order"
import { ReactNode } from "react"
import { getStatusRepresentation } from "@/app/_utils"

function formatOrderListAsTableData(orderList: Order[]) {
  return orderList.map((order) => {
    const customerName = `${order.placedBy?.firstName} ${order.placedBy?.lastName}`
    const deliveryDate = new Date(order.deliveryDate).toDateString()
    const deliveryTime = new Date(order.deliveryDate).toLocaleTimeString(
      "en-us",
      {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      }
    )
    const orderPrice = (order.product?.price || 0).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    })
    const tableData: ReactNode[] = [
      customerName,
      deliveryDate,
      deliveryTime,
      order.product?.name,
      order.productQuantity,
      orderPrice,
      getStatusRepresentation(order.status),
    ]

    return tableData
  })
}

export default function ProductVendorDashboard({
  loading,
  store,
  orders,
}: {
  loading?: boolean
  store: Store | null
  orders: Order[]
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
      <DashboardProductsSection
        heading="Best selling products"
        products={store?.bestSellingProducts}
        loading={loading}
      />
      <ProductOrdersTable
        loading={loading}
        tableData={formatOrderListAsTableData(orders)}
      />
    </VStack>
  )
}
//serviceSchema
// { serviceCategory: OID, price, name, estimatedDuration,  }
