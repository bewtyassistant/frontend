"use client"
import BasicPageLayout from "@/app/_components/Layouts/BasicPageLayout"
import MobileSearchHeader from "@/app/_components/Layouts/MobileSearchHeader"
import MostBookedService from "@/app/_components/Services/MostBookedService"
import ServicePageHeading from "@/app/_components/Services/ServicePageHeading"
import ServicesList from "@/app/_components/Services/ServicesList"
import { useAppSelector } from "@/app/_redux/store"

export default function VendorOverviewPage() {
  const { mostBookedService, loading, storeServices } = useAppSelector(
    (store) => store.store
  )

  return (
    <BasicPageLayout>
      <MobileSearchHeader />
      <ServicePageHeading />
      <MostBookedService
        loading={loading}
        serviceName={mostBookedService?.name || ""}
        serviceImage={mostBookedService?.displayImage?.secure_url || ""}
      />
      <ServicesList loading={loading} services={storeServices} />
    </BasicPageLayout>
  )
}
