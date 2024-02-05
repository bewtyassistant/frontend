import type { Metadata } from "next"
import "./globals.css"
import ChakraUIProvider from "./_providers/chakra-ui"
import LocalForageProvider from "./_providers/localforage"

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
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </LocalForageProvider>
      </body>
    </html>
  )
}
