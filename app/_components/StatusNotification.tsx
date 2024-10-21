"use client"
import { Flex, useOutsideClick } from "@chakra-ui/react"
import CheckMark from "../_assets/CheckMark"
import { ReactNode, useEffect, useRef, useState } from "react"
import TimesIcon from "../_assets/TimesIcon"

export const NOTIFICATION_STATUS: {
  [x: string]: NOTIFICATION_STATUS_TYPE
} = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  NEUTRAL: "NEUTRAL",
  INFO: "INFO",
}

export type NOTIFICATION_STATUS_TYPE =
  | "SUCCESS"
  | "ERROR"
  | "WARNING"
  | "NEUTRAL"
  | "INFO"

export const NOTIFICATION_COLORS = {
  SUCCESS: "#64E6A7",
  ERROR: "#D02E2E",
  WARNING: "",
  NEUTRAL: "",
  INFO: "",
}

export const NOTIFICATION_ICONS = {
  SUCCESS: <CheckMark fill="#64E6A7" />,
  ERROR: <TimesIcon fill="#D02E2E" />,
  WARNING: "",
  NEUTRAL: "",
  INFO: "",
}

export const NOTIFICATION_TEXT_COLORS = {
  SUCCESS: "#FFF",
  ERROR: "#FFF",
  WARNING: "",
  NEUTRAL: "",
  INFO: "",
}

export default function StatusNotification({
  status,
  children,
  timeToDisappearInMilliseconds,
}: {
  status: NOTIFICATION_STATUS_TYPE
  children: ReactNode | ReactNode[]
  timeToDisappearInMilliseconds?: number
}) {
  const [show, setShow] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)
  useOutsideClick({ ref, enabled: true, handler: () => setShow(false) })
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, timeToDisappearInMilliseconds || 1500)
  }, [timeToDisappearInMilliseconds])

  if (!show) return null
  return (
    <>
      <Flex
        ref={ref}
        flexDir={{ base: "column-reverse", md: "row" }}
        justifyContent="center"
        alignItems="center"
        w="80%"
        mx="auto"
        pos="fixed"
        zIndex="100000000000"
        top="50%"
        left="50%"
        maxW={{ base: "28.2rem", md: "56.2rem" }}
        transform="translate(-50%, -50%)"
        bg={NOTIFICATION_COLORS[status]}
        color={NOTIFICATION_TEXT_COLORS[status]}
        fontSize={{ base: "1.4rem", md: "2rem" }}
        padding={{ base: "3.3rem 2.4rem", md: "5.5rem 5.5rem" }}
        gap={{ base: "1.2rem", md: ".8remF" }}
        textAlign="center"
      >
        {children}
        <Flex
          bg="white"
          rounded="full"
          alignItems="center"
          justifyContent="center"
          w="4.8rem"
          h="4.8rem"
          shrink="0"
        >
          {NOTIFICATION_ICONS[status]}
        </Flex>
      </Flex>
    </>
  )
}
