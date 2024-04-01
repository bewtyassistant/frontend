import type { Metadata } from "next"
import "./globals.css"
import ChakraUIProvider from "./_providers/chakra-ui"
import LocalForageProvider from "./_providers/localforage"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./_providers/auth"

export const metadata: Metadata = {
  title: "Bewty Assistant",
  description: "The one stop for all your beauty needs...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LocalForageProvider>
          <ChakraUIProvider>
            <AuthProvider>
              {children}
              <Toaster
                containerStyle={{ fontSize: "1.6rem", fontWeight: "600" }}
              />
            </AuthProvider>
          </ChakraUIProvider>
        </LocalForageProvider>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=Function.prototype`}
        ></script>
      </body>
    </html>
  )
}
