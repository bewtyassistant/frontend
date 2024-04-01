"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import { StoreType } from "@/app/_types/Store"

export default function Page() {
  return (
    <>
      <AuthLayout
        headingText="Product Vendor"
        subHeadingText="Set up your shop and start selling"
        gap={"3rem"}
        showBackButton
      >
        <VendorStoreCreationForm type={StoreType.product} />
      </AuthLayout>
    </>
  )
}
