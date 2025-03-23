import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppDispatch, useAppSelector } from "@/app/_redux/store"
import { Box, Collapse, Text } from "@chakra-ui/react"
import AppModal from "../AppModal"
import { useCallback, useState } from "react"
import NewAppointmentForm from "./Form"
import FormReviewStage from "./FormReview"
import useAxios from "@/app/_hooks/useAxios"
import toast from "react-hot-toast"
import Store from "@/app/_types/Store"
import Service from "@/app/_types/Service"
import { addNewAppointmentRequest } from "@/app/_redux/appointments.slice"
import StatusNotification from "../../StatusNotification"

export default function NewAppointmentModal() {
  const { showNewAppointmentModal } = useAppSelector((store) => store.ui)
  const toggleShowNewAppointmentModal = useToggleShowNewAppointmentModal()
  const { fetchData } = useAxios()
  const [message, setMessage] = useState("")
  const [stage, setStage] = useState(0)
  const { StatusNotificationComponent, toggleShow } = StatusNotification({
    timeToDisappearInMilliseconds: 8000,
    status: "SUCCESS",
    children: message,
  })
  const [formData, setFormData] = useState<
    Partial<{
      idsOfServicesRequired: string[]
      servicesRequired: Service[]
      vendor: Store
      location: ""
      appointmentDateAndTime: ""
      note: ""
      vendorToUse: "previously-used-vendor" | "new-vendor"
    }>
  >({})
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmitForReview = useCallback((data: {}) => {
    setStage(1)
    setFormData(data)
  }, [])

  const dispatch = useAppDispatch()

  const handleSubmitData = useCallback(async () => {
    if (stage !== 1 || loading) return
    setLoading(true)
    setErrorMsg("")
    const res = await fetchData({
      url: "/appointment-requests",
      method: "post",
      body: {
        ...formData,
        vendor: formData.vendor?._id,
        servicesRequired: formData.idsOfServicesRequired,
      },
    })
    if (res.statusCode === 201) {
      dispatch(addNewAppointmentRequest(res.data))
      setMessage(res.message)
      toggleShow(true)
      dispatch(toggleShowNewAppointmentModal(false))
      setStage(0)
    } else {
      setErrorMsg(
        res.message || "Unable to request appointment, Something went wrong."
      )
    }
    setLoading(false)
  }, [formData, fetchData, dispatch, toggleShow])

  const handleCancel = useCallback(() => {
    setStage(0)
    toggleShowNewAppointmentModal(false)
    setFormData({})
  }, [toggleShowNewAppointmentModal])

  return (
    <>
      <StatusNotificationComponent />
      <AppModal
        isOpen={showNewAppointmentModal}
        onClose={toggleShowNewAppointmentModal}
        headerContent={<>Create a new appointment</>}
        showModalCloseButton
        closeOnOutsideClick={false}
      >
        <Box pt="3.2rem" pb={{ base: "13rem", md: "8.8rem" }}>
          <Collapse in={stage === 0}>
            <Text
              mb="3.2rem"
              fontSize="1.6rem"
              lineHeight="112%"
              maxW="43.2rem"
              mx="auto"
            >
              Create a new appointment by providing the below information and
              we&apos;ll find you a match.
            </Text>
            <NewAppointmentForm
              handleCancel={() => handleCancel()}
              handleSubmit={handleSubmitForReview}
            />
          </Collapse>
          <Collapse in={stage === 1}>
            <FormReviewStage
              handleCancel={() => handleCancel()}
              handleSubmit={handleSubmitData}
              handleEditForm={() => setStage(0)}
              formData={formData}
              loading={loading}
              errorMsg={errorMsg}
            />
          </Collapse>
        </Box>
      </AppModal>
    </>
  )
}
