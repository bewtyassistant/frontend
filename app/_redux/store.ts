"use client"
// Store here is redux store not user product or service store
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { authReducer } from "./auth.slice"
import { storeReducer } from "./store.slice"
import { appointmentsReducer } from "./appointments.slice"
import { ordersReducer } from "./orders.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    store: storeReducer,
    appointments: appointmentsReducer,
    orders: ordersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
