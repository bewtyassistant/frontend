"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import { StoreType } from "@/app/_types/Store"

export default function Page() {
  return (
    <>
      <AuthLayout
        headingText="Product Vendor"
        subHeadingText="Provide verifyable information about your store"
        gap={"3rem"}
      >
        <VendorStoreCreationForm type={StoreType.product} />
      </AuthLayout>
    </>
  )
}
