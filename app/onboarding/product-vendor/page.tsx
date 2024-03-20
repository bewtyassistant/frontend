"use client"
import AuthLayout from "@/app/_components/Auth/Layout"
import SubLayoutWithBackButton from "@/app/_components/Auth/SubLayoutWithBackButton"
import VendorStoreCreationForm from "@/app/_components/Auth/VendorStoreCreationForm"
import { StoreType } from "@/app/_types/Store"

export default function page() {
  return (
    <>
      <AuthLayout
        headingText="Product Vendor"
        subHeadingText="Set up your shop and start selling"
        gap={"3rem"}
      >
        <SubLayoutWithBackButton top={{ base: "-26%", sm: "-28%", md: "-30%" }}>
          <VendorStoreCreationForm type={StoreType.product} />
        </SubLayoutWithBackButton>
      </AuthLayout>
    </>
  )
}
