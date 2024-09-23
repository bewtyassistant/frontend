import useToggleShowNewAppointmentModal from "@/app/_hooks/useToggleShowNewAppointmentModal"
import { useAppSelector } from "@/app/_redux/store"
import { Box, Collapse, Text } from "@chakra-ui/react"
import AppModal from "../AppModal"
import { useCallback, useState } from "react"
import NewAppointmentForm from "./Form"
import FormReviewStage from "./FormReview"
import useAxios from "@/app/_hooks/useAxios"
import toast from "react-hot-toast"

export default function NewAppointmentModal() {
  const { showNewAppointmentModal } = useAppSelector((store) => store.ui)
  const toggleShowNewAppointmentModal = useToggleShowNewAppointmentModal()
  const { fetchData } = useAxios()
  const [isReviewStage, setIsReviewStage] = useState(false)
  const [formData, setFormData] = useState({})

  const handleSubmitForReview = useCallback((data: {}) => {
    setIsReviewStage(true)
    setFormData(data)
  }, [])

  const handleSubmitData = useCallback(async () => {
    if (!isReviewStage) return
    if (Object.keys(formData).length < 6) return
    console.log(formData)
    // const res = await fetchData({
    //   url: "",
    //   method: "post",
    //   body: formData,
    // })
    // console.log(res)
  }, [formData, fetchData])

  const handleCancel = useCallback(() => {
    setIsReviewStage(false)
    toggleShowNewAppointmentModal(false)
    setFormData({})
  }, [toggleShowNewAppointmentModal])

  return (
    <AppModal
      isOpen={showNewAppointmentModal}
      onClose={toggleShowNewAppointmentModal}
      headerContent={<>Create a new appointment</>}
      showModalCloseButton
      closeOnOutsideClick={false}
    >
      <Box pt="3.2rem" pb={{ base: "13rem", md: "8.8rem" }}>
        <Collapse in={isReviewStage === false}>
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
        <Collapse in={isReviewStage === true}>
          <FormReviewStage
            handleCancel={() => handleCancel()}
            handleSubmit={handleSubmitData}
            handleEditForm={() => setIsReviewStage(false)}
            formData={formData}
          />
        </Collapse>
      </Box>
    </AppModal>
  )
}
