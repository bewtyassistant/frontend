import APPOINTMENT_URLS from "@/app/_urls/appointments"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAppointments = createAsyncThunk(
  "store/fetchAppointments",
  async (storeId?: string) => {
    const res = await axiosFetcher({
      url: storeId
        ? APPOINTMENT_URLS.getStoreAppointments(storeId)
        : APPOINTMENT_URLS.getUserAppointments(),
      method: "get",
    })
    return res.appointments
  }
)
export const fetchPreviouslyUsedStylists = createAsyncThunk(
  "store/fetchPreviouslyUsedStylists",
  async () => {
    const res = await axiosFetcher({
      url: APPOINTMENT_URLS.getPreviouslyUsedStylists(),
      method: "get",
    })
    return res.results
  }
)
