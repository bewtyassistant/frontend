"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import SubLayoutWithBackButton from "@/app/_components/Auth/SubLayoutWithBackButton"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import { StoreType } from "@/app/_types/Store"

export default function page() {
  return (
    <>
      <AuthLayout
        headingText="Service Vendor"
        subHeadingText="Set up your shop and start providing beauty services"
        gap={"3rem"}
      >
        <SubLayoutWithBackButton top={{ base: "-30%", sm: "-32%", md: "-35%" }}>
          <VendorStoreCreationForm type={StoreType.service} />
        </SubLayoutWithBackButton>
      </AuthLayout>
    </>
  )
}
