import appointmentsFilters, {
  AppointmentFilterKey,
} from "@/app/_data/appointmentsFilter"
import formatAppointmentsListAsTableData from "@/app/_utils/appointments"
import {
  VStack,
  Heading,
  Flex,
  Button,
  Text,
  Box,
  Hide,
  Show,
} from "@chakra-ui/react"
import AppTable from "../AppTable"
import { pageHeadingStyles } from "../Dashboard/WelcomeBackHeading"
import { useAppSelector } from "@/app/_redux/store"
import { useMemo, useState } from "react"
import PlusIcon from "@/app/_assets/PlusIcon"
import Status from "@/app/_types/Status"
import { ErrorTextDisplay } from "../Auth/ErrorText"
import AppointmentFilterButton from "./AppointmentFilterButton"
import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"

export default function AppointmentsPageView({
  showNewAppointmentButton,
  showManageButton,
  useClientName,
}: {
  showNewAppointmentButton?: boolean
  showManageButton: boolean
  useClientName: boolean
}) {
  const toggleShowNewAppointmentModal = useToggleShowNewAppointmentModal()
  const { appointments, loading } = useAppSelector(
    (store) => store.appointments
  )
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
            top={{ base: "25px", md: "0" }}
            right="0"
            px={{ base: "1rem", md: "1.6rem" }}
            py={{ base: "1rem", md: "1.4rem" }}
            gap="1rem"
            rounded="2.4rem"
            alignItems="center"
            display="flex"
            onClick={() => toggleShowNewAppointmentModal(true)}
          >
            <>
              <Hide below="md">
                New Appointment <PlusIcon />
              </Hide>
              <Show below="md">
                <PlusIcon />
              </Show>
            </>
          </Button>
        )}
        <Heading
          as="h1"
          {...pageHeadingStyles}
          mb={{ base: "1.6rem", md: "2rem" }}
        >
          Appointment Schedules
        </Heading>
        <Text
          fontSize={{ base: "1.6rem", md: "2rem" }}
          maxW={{ base: "80%", md: "unset" }}
          mb="1.2rem"
        >
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
          {filteredAppointments?.length > 0 && (
            <AppTable
              loading={loading}
              headings={["", "", "", "", "", "", "", ""]}
              showHeaderRow={false}
              tableData={formatAppointmentsListAsTableData(
                filteredAppointments,
                showManageButton,
                useClientName
              )}
            />
          )}
          {filteredAppointments?.length <= 0 && !loading && (
            <Flex
              justifyContent="center"
              alignItems="center"
              w="full"
              py="4rem"
            >
              <ErrorTextDisplay show={filteredAppointments?.length <= 0}>
                No appointments match your selected filter
              </ErrorTextDisplay>
            </Flex>
          )}
        </Box>
      </VStack>
    </>
  )
}
