import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  ResponsiveValue,
} from "@chakra-ui/react"
import { ReactNode, RefObject } from "react"
import CloseIcon from "@/app/_assets/CloseIcon"

export default function MobileSideBar({
  children,
  isOpen,
  onClose,
  placement,
  finalFocusRef,
  size
}: {
  children: ReactNode | ReactNode[]
  isOpen: boolean
  placement: "left" | "right" | "top" | "bottom" | "end" | "start"
  onClose: () => void
  finalFocusRef?: RefObject<HTMLElement>
  size?:  ResponsiveValue<string>
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement={placement || "right"}
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      size={size || "md"}
    >
      <DrawerOverlay />
      <DrawerContent bg="white">
        <IconButton
          onClick={onClose}
          bg="transparent"
          _focus={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          w="fit"
          justifyContent="flex-end"
          py="1.6rem"
          px="1.6rem"
          h="unset"
          color="brand.main"
          aria-label="close menu"
        >
          <CloseIcon />
        </IconButton>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
