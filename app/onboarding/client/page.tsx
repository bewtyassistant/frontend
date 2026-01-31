"use client"
import ClientProfileSetup from "@/app/_components/Auth/ClientProfileSetup"
import AuthLayout from "@/app/_components/Auth/Layout"

export default function Page() {
  return (
    <>
      <AuthLayout
        headingText="Client"
        subHeadingText="Provide verifiable information about you"
        gap={"3rem"}
      >
        <ClientProfileSetup />
      </AuthLayout>
    </>
  )
}
