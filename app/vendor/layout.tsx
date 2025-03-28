"use client"
import "../globals.css"
import DesktopLayout from "../_components/Layouts/_LayoutDesktop"
import { Show } from "@chakra-ui/react"
import MobileLayout from "../_components/Layouts/_LayoutMobile"
import DesktopLayoutChildren from "../_components/Layouts/DesktopHeaderChildren"
import ImageAndNameAndLastSeen from "../_components/ImageAndNameAndLastSeen"
import MobileSideBarContent from "../_components/Layouts/MobileSidebarContent"
import { serviceVendorNavLinks } from "../_data/navLinks"
import NavLinksMapper from "../_components/Layouts/NavLinksMapper"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux/store"
import {
  fetchMostBookedService,
  fetchStore,
  fetchStoreStats,
  fetchStoreServices,
} from "../_redux/thunks/store.thunk"
import { useRouter } from "next/navigation"
import AppFooter from "../_components/AppFooter"
import { fetchAppointments } from "../_redux/thunks/appoinments.thunk"
import { fetchOrders } from "../_redux/thunks/orders.thunk"
import AppointmentRescheduleConfirmationModal from "../_components/Modals/AppointmentRescheduleAcceptOrRejectModal"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { needsToCreateStore, store } = useAppSelector((store) => store.store)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchStore())
  }, [dispatch])

  useEffect(() => {
    if (store) dispatch(fetchAppointments(store._id))
  }, [dispatch, store])

  useEffect(() => {
    if (store) dispatch(fetchStoreServices())
  }, [dispatch, store])

  useEffect(() => {
    if (store) dispatch(fetchMostBookedService())
  }, [dispatch, store])

  useEffect(() => {
    if (store) dispatch(fetchOrders(store._id))
  }, [dispatch, store])

  useEffect(() => {
    if (needsToCreateStore) router.push("/onboarding")
    else if (store) dispatch(fetchStoreStats())
  }, [dispatch, router, needsToCreateStore, store])

  return (
    <>
      <Show above="md">
        <DesktopLayout
          headerChildren={<DesktopLayoutChildren />}
          sidebarChildren={{
            header: <ImageAndNameAndLastSeen />,
            body: <NavLinksMapper links={serviceVendorNavLinks} />,
          }}
        >
          {children}
        </DesktopLayout>
      </Show>
      <Show below="md">
        <MobileLayout
          headerChildren={<ImageAndNameAndLastSeen />}
          SidebarChildren={() =>
            MobileSideBarContent({ links: serviceVendorNavLinks })
          }
        >
          {children}
        </MobileLayout>
      </Show>
      <AppointmentRescheduleConfirmationModal />
      <AppFooter />
    </>
  )
}
