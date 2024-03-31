"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import VendorCategorySelectionForm from "@/app/_components/Auth/VendorCategorySelectionForm"
import { StoreType } from "@/app/_types/Store"

export default function page() {
  return (
    <>
      <AuthLayout
        headingText="Service Categories"
        subHeadingText="Select your various service categories"
        gap={"3rem"}
      >
        <VendorCategorySelectionForm type={StoreType.service} />
      </AuthLayout>
    </>
  )
}
