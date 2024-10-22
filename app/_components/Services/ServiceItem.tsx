"use client"
import EditIcon from "@/app/_assets/EditIcon"
import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import NewServiceForm from "./NewServiceForm"

export default function ServiceItem() {
  const [showEditModal, setShowEditModal] = useState(false)
  return (
    <>
      <Flex
        fontSize={{ base: "1.4rem", md: "2rem" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>Retouching of virgin hair with salon products</Text>
        <Text display="flex" alignItems="center" gap="1.6rem">
          <Text as="span" className="naira">
            1000
          </Text>
          <Text as="button" onClick={() => setShowEditModal(true)}>
            <EditIcon />
          </Text>
        </Text>
      </Flex>
      <NewServiceForm
        formState="edit"
        isOpen={showEditModal}
        handleClose={() => setShowEditModal(false)}
      />
    </>
  )
}
