"use client"
import "../globals.css"
import DesktopLayout from "../_components/Layouts/_LayoutDesktop"
import { Show } from "@chakra-ui/react"
import MobileLayout from "../_components/Layouts/_LayoutMobile"
import DesktopLayoutChildren from "../_components/Layouts/DesktopHeaderChildren"
import ImageAndNameAndLastSeen from "../_components/ImageAndNameAndLastSeen"
import MobileSideBarContent from "../_components/Layouts/MobileSidebarContent"
import { clientNavLinks } from "../_data/navLinks"
import NavLinksMapper from "../_components/Layouts/NavLinksMapper"
import AuthProvider from "../_providers/auth"
import AppFooter from "../_components/AppFooter"
import { useEffect } from "react"
import { fetchAppointments } from "../_redux/thunks/appoinments.thunk"
import { fetchOrders } from "../_redux/thunks/orders.thunk"
import store from "../_urls/store"
import { useAppDispatch } from "../_redux/store"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (store) dispatch(fetchAppointments())
  }, [dispatch, store])

  useEffect(() => {
    if (store) dispatch(fetchOrders())
  }, [dispatch, store])

  return (
    <AuthProvider>
      <Show above="md">
        <DesktopLayout
          headerChildren={<DesktopLayoutChildren />}
          sidebarChildren={{
            header: <ImageAndNameAndLastSeen />,
            body: <NavLinksMapper links={clientNavLinks} />,
          }}
        >
          {children}
        </DesktopLayout>
      </Show>
      <Show below="md">
        <MobileLayout
          headerChildren={<ImageAndNameAndLastSeen />}
          SidebarChildren={() =>
            MobileSideBarContent({ links: clientNavLinks })
          }
        >
          {children}
        </MobileLayout>
      </Show>
      <AppFooter />
    </AuthProvider>
  )
}
