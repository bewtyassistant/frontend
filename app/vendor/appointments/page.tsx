"use client"
import MobileSearchHeader from "@/app/_components/Layouts/MobileSearchHeader"
import { useAppSelector } from "@/app/_redux/store"
import { VStack } from "@chakra-ui/react"

export default function VendorOverviewPage() {
  const { store, loading, ...restOfStoreState } = useAppSelector(
    (store) => store.store
  )
  const { appointments } = useAppSelector((store) => store.appointments)
  
  return (
    <VStack alignItems="stretch">
      <MobileSearchHeader />
    </VStack>
  )
}
