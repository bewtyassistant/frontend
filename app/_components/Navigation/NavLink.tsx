"use client"
import { Link, Text } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import { ReactNode, useMemo } from "react"

export default function NavLinkComponent({
  href,
  name,
  icon,
  onClick,
}: {
  href: string
  icon: ReactNode
  name: string
  onClick?: () => void
}) {
  const pathname = usePathname()

  const isActive = useMemo(() => {
    return pathname.includes(href)
  }, [pathname])

  return (
    <Link
      onClick={onClick}
      display="flex"
      color={isActive ? "brand.main" : "gray.400"}
      fontSize={{ base: "2rem" }}
      lineHeight={{ base: "2.25rem" }}
      href={href}
      alignItems="center"
      gap="2rem"
      _hover={{ color: "brand.500", opacity: ".8" }}
      textDecor="none"
    >
      {icon} <Text as="span">{name}</Text>
    </Link>
  )
}
