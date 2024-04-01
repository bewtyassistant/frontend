"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import useRedirectToHomeIfNotLoggedIn from "@/app/_hooks/useRedirectToHomeIfNotLoggedIn"
import { StoreType } from "@/app/_types/Store"

export default function Page() {
  useRedirectToHomeIfNotLoggedIn()
  return (
    <>
      <AuthLayout
        headingText="Service Vendor"
        subHeadingText="Set up your shop and start providing beauty services"
        gap={"3rem"}
        showBackButton
      >
        <VendorStoreCreationForm type={StoreType.service} />
      </AuthLayout>
    </>
  )
}
