import appointmentsFilters, {
  AppointmentFilterKey,
  AppointmentFilter,
} from "@/app/_data/appointmentsFilter"
import formatAppointmentsListAsTableData from "@/app/_utils/appointments"
import { VStack, Heading, Flex, Button, Text, Box } from "@chakra-ui/react"
import AppTable from "../AppTable"
import { pageHeadingStyles } from "../Dashboard/WelcomeBackHeading"
import { useAppSelector } from "@/app/_redux/store"
import { useMemo, useState } from "react"
import PlusIcon from "@/app/_assets/PlusIcon"
import Status from "@/app/_types/Status"
import { ErrorTextDisplay } from "../Auth/ErrorText"
import AppointmentFilterButton from "./AppointmentFilterButton"
import NewAppointmentButtonClickHandler from "./NewAppointmentButtonClickHandler"

export default function AppointmentsPageView({
  showNewAppointmentButton,
}: {
  showNewAppointmentButton?: boolean
}) {
  const { loading } = useAppSelector((store) => store.store)
  const { appointments } = useAppSelector((store) => store.appointments)
  const [currentFilter, setCurrentFilter] = useState(appointmentsFilters[0])

  const filteredAppointments = useMemo(() => {
    switch (currentFilter.filterKey) {
      case AppointmentFilterKey.COMPLETED:
        return appointments.filter((it) => it.status === Status.FULFILLED)
      case AppointmentFilterKey.UPCOMING:
        return appointments.filter(
          (it) => new Date(it.bookedDate).getTime() > Date.now()
        )
      case AppointmentFilterKey.RESCHEDULED:
        return appointments.filter((it) => it.isRescheduled === true)
      case AppointmentFilterKey.CANCELLED:
        return appointments.filter((it) => it.status === Status.CANCELLED)
      default:
        return appointments
    }
  }, [appointments, currentFilter])
  return (
    <>
      <VStack alignItems="flex-start" gap="0" pos="relative">
        {showNewAppointmentButton && (
          <Button
            variant="filled"
            pos="absolute"
            top="0%"
            right="0"
            px="1.6rem"
            py="2rem"
            gap="1rem"
            rounded="2.4rem"
          >
            <NewAppointmentButtonClickHandler
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              New Appointment <PlusIcon />
            </NewAppointmentButtonClickHandler>
          </Button>
        )}
        <Heading
          as="h1"
          {...pageHeadingStyles}
          mb={{ base: "1.6rem", md: "2rem" }}
        >
          Appointment Schedules
        </Heading>
        <Text fontSize={{ base: "1.6rem", md: "2rem" }} mb="1.2rem">
          {currentFilter.description}
        </Text>
        <Text fontSize="1.6rem" mb="1.2rem" color="gray.400">
          {currentFilter.summary}
        </Text>
        <Box
          mt={{ base: "3.3rem", md: "6.1rem" }}
          overflow="auto"
          w="full"
          className="styled-scrollbar"
          pos="relative"
          gap={{ base: "1.6rem", md: 0 }}
        >
          <Flex
            w="100%"
            left="0"
            flexWrap="wrap"
            justifyContent="flex-start"
            pos="sticky"
          >
            {appointmentsFilters.map((filter) => (
              <AppointmentFilterButton
                key={filter.filterKey}
                filter={filter}
                currentFilter={currentFilter}
                onClick={(filter) => setCurrentFilter(filter)}
              />
            ))}
          </Flex>
          {filteredAppointments.length > 0 && (
            <AppTable
              loading={loading}
              headings={["", "", "", "", "", "", "", ""]}
              showHeaderRow={false}
              tableData={formatAppointmentsListAsTableData(
                filteredAppointments,
                true
              )}
            />
          )}
          {filteredAppointments.length <= 0 && (
            <Flex
              justifyContent="center"
              alignItems="center"
              w="full"
              py="4rem"
            >
              <ErrorTextDisplay show={filteredAppointments.length <= 0}>
                No appointments match your selected filter
              </ErrorTextDisplay>
            </Flex>
          )}
        </Box>
      </VStack>
    </>
  )
}
