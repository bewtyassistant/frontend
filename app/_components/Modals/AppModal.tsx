import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { ReactNode } from "react"

export default function AppModal({
  isOpen,
  onClose,
  headerContent,
  children,
  showModalCloseButton,
  closeOnOutsideClick,
}: {
  isOpen: boolean
  onClose: () => void
  headerContent: ReactNode | ReactNode[]
  children: ReactNode | ReactNode[]
  showModalCloseButton?: boolean
  closeOnOutsideClick?: boolean
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={closeOnOutsideClick}
    >
      <ModalOverlay bg="#BA2762CC" />
      <ModalContent bg="white" w="full" maxW="64rem" rounded="0">
        <ModalHeader
          bg="brand.main"
          py={{ base: "3.65rem", md: "3.2rem" }}
          color="white"
          fontSize={{ base: "2.4rem", md: "3.2rem" }}
          textAlign="center"
        >
          {headerContent}
          {showModalCloseButton && <ModalCloseButton size="lg" />}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
