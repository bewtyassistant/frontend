import STORE_URLS from "@/app/_urls/store"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchStore = createAsyncThunk(
  "store/fetchStore",
  async () => {
    const res = await axiosFetcher({
      url: STORE_URLS.get(),
      method: "get",
    })
    return res.store
  }
)

export const fetchStoreStats = createAsyncThunk(
  "store/fetchStoreStats",
  async () => {
    const res = await axiosFetcher({
      url: STORE_URLS.getStats(),
      method: "get",
    })
    return res
  }
)
