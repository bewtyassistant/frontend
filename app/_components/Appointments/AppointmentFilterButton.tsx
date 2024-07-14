import { AppointmentFilter } from "@/app/_data/appointmentsFilter"
import { Button } from "@chakra-ui/react"


export default function AppointmentFilterButton({
  filter,
  currentFilter,
  onClick,
}: {
  filter: AppointmentFilter
  currentFilter: AppointmentFilter
  onClick: (filter: AppointmentFilter) => void
}) {
  return (
    <Button
      key={filter.heading}
      flexGrow={{ sm: "1" }}
      px={{ base: "1.5rem", md: "2.4rem" }}
      py={{ base: "1.2rem", md: "1.9rem" }}
      height="unset"
      rounded="0"
      variant={filter.heading === currentFilter.heading ? "" : "filled"}
      background={
        filter.heading === currentFilter.heading ? "brand.main" : "transparent"
      }
      color={filter.heading === currentFilter.heading ? "white" : "dark.400"}
      transition="all 250ms ease"
      onClick={() => onClick(filter)}
    >
      {filter.heading}
    </Button>
  )
}
