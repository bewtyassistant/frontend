"use client"
import EditIcon from "@/app/_assets/EditIcon"
import DeleteIcon from "@/app/_assets/DeleteIcon"
import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import NewServiceForm from "./NewServiceForm"
import { VendorService } from "@/app/_types/Service"

export default function ServiceItem({ service }: { service: VendorService }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  return (
    <>
      <Flex
        fontSize={{ base: "1.4rem", md: "2rem" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>{service.service.name}</Text>
        <Text display="flex" alignItems="center" gap="1.6rem">
          <Text as="span" className="naira">
            {service.price}
          </Text>
          <Text as="button" onClick={() => setShowEditModal(true)}>
            <EditIcon />
          </Text>
          <Text
            color="#F29DBA"
            as="button"
            onClick={() => setShowDeleteModal(true)}
          >
            <DeleteIcon />
          </Text>
        </Text>
      </Flex>
      <NewServiceForm
        formState="edit"
        service={service}
        isOpen={showEditModal}
        handleClose={() => setShowEditModal(false)}
      />
    </>
  )
}
