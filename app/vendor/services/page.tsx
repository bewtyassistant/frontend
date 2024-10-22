"use client"
import BasicPageLayout from "@/app/_components/Layouts/BasicPageLayout"
import MobileSearchHeader from "@/app/_components/Layouts/MobileSearchHeader"
import MostBookedService from "@/app/_components/Services/MostBookedService"
import ServicePageHeading from "@/app/_components/Services/ServicePageHeading"
import ServicesList from "@/app/_components/Services/ServicesList"

export default function VendorOverviewPage() {
  return (
    <BasicPageLayout>
      <MobileSearchHeader />
      <ServicePageHeading />
      <MostBookedService serviceName={""} serviceImage={""} />
      <ServicesList />
    </BasicPageLayout>
  )
}
