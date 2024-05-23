"use client"
import AppointmentsPageView from "@/app/_components/Appointments/AppointmentsPageView"
import BasicPageLayout from "@/app/_components/Layouts/BasicPageLayout"
import MobileSearchHeader from "@/app/_components/Layouts/MobileSearchHeader"

export default function VendorOverviewPage() {
  return (
    <BasicPageLayout>
      <MobileSearchHeader />
      <AppointmentsPageView
        showNewAppointmentButton={false}
        showManageButton
        useClientName
      />
    </BasicPageLayout>
  )
}
