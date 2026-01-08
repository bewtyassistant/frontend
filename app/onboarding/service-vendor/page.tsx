"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import { StoreType } from "@/app/_types/Store"

export default function Page() {
  return (
    <>
      <AuthLayout
        headingText="Service Provider"
        subHeadingText="Set up your shop and start providing beauty services"
        gap={"3rem"}
        showBackButton
      >
        <VendorStoreCreationForm type={StoreType.service} />
      </AuthLayout>
    </>
  )
}
