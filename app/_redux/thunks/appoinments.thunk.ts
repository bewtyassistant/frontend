import APPOINTMENT_URLS from "@/app/_urls/appointments"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAppointments = createAsyncThunk(
  "store/fetchAppointments",
  async (storeId: "" | boolean, thunkAPI) => {
    const res = await axiosFetcher({
      url:
        storeId && typeof storeId === "string"
          ? APPOINTMENT_URLS.getStoreAppointments(storeId)
          : APPOINTMENT_URLS.getUserAppointments(),
      method: "get",
    })
    if (res.statusCode === 200) return res.appointments
    else thunkAPI.rejectWithValue(res)
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
