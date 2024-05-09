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
import AuthProvider from "../_providers/auth"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../_redux/store"
import { fetchStore } from "../_redux/thunks/store.thunk"
import { useRouter } from "next/navigation"
import AppFooter from "../_components/AppFooter"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { needsToCreateStore } = useAppSelector((store) => store.store)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchStore())
  }, [dispatch])

  useEffect(() => {
    if (needsToCreateStore) router.push("/onboarding")
  }, [router, needsToCreateStore])

  return (
    <AuthProvider>
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
      <AppFooter />
    </AuthProvider>
  )
}
