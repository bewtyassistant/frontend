import ORDER_URLS from "@/app/_urls/orders"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchOrders = createAsyncThunk(
  "store/fetchOrders",
  async (storeId?: string) => {
    const res = await axiosFetcher({
      url: storeId
        ? ORDER_URLS.getStoreOrders(storeId)
        : ORDER_URLS.getUserOrders(),
      method: "get",
    })
    return res.orders
  }
)
