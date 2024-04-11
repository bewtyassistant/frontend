import { Heading, HeadingProps } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function DashboardHeading({
  children,
  ...rest
}: { children: ReactNode | ReactNode[] } & HeadingProps) {
  return (
    <Heading
      as="h2"
      fontSize="2rem"
      lineHeight="2.25rem"
      fontWeight="400"
      {...rest}
    >
      {children}
    </Heading>
  )
}
