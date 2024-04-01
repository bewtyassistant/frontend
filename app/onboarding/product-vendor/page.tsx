"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import useRedirectToHomeIfNotLoggedIn from "@/app/_hooks/useRedirectToHomeIfNotLoggedIn"
import { StoreType } from "@/app/_types/Store"

export default function page() {
  useRedirectToHomeIfNotLoggedIn()
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
