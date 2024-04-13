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
import AppFooter from "../_components/AppFooter"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
