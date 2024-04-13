import { Box, Flex } from "@chakra-ui/react"
import DashboardProductCard from "./DashboardProductCard"
import BackIcon from "@/app/_assets/BackIcon"
import { ReactNode, useRef } from "react"
import DashboardHeading from "./DashboardHeading"
import Product from "@/app/_types/Product"

const productBgColors = {
  0: "#62BEC11A",
  1: "#FFE3E780",
}
export default function DashboardProductsSection({
  loading,
  products = [],
  heading,
}: {
  loading?: boolean
  products?: Product[]
  heading: ReactNode
}) {
  const listContainerRef = useRef<HTMLDivElement | null>(null)
  if (!loading && products.length === 0) return null
  return (
    <Box overflowX="auto" pos="relative" zIndex="0" ref={listContainerRef}>
      <DashboardHeading mb="1.5rem" pos="sticky" left="0">
        {heading}
      </DashboardHeading>
      <Flex gap={{ base: "3rem", md: "6rem" }} w="max-content" pos="relative">
        {products.map((product, index) => (
          <DashboardProductCard
            key={product._id}
            name={product.name}
            bg={
              productBgColors[
                (index % 2) as keyof typeof productBgColors
              ] as string
            }
          />
        ))}
        {loading && (
          <>
            <DashboardProductCard loading={loading} bg="#62BEC11A" name="" />
            <DashboardProductCard loading={loading} bg="#FFE3E780" name="" />
            <DashboardProductCard loading={loading} bg="#62BEC11A" name="" />
            <DashboardProductCard loading={loading} bg="#FFE3E780" name="" />
          </>
        )}
        <Flex
          h={{ base: "13.8rem", sm: "20rem" }}
          pos="sticky"
          right="0"
          bg="white"
          w={{ base: "7rem", sm: "6rem" }}
          transform="rotate(180deg)"
          justifyContent="center"
          alignItems="center"
          display={{ base: "flex", md: "none" }}
          as="button"
          onClick={() =>
            listContainerRef.current?.scrollTo({
              left: listContainerRef.current.scrollLeft + 200,
              behavior: "smooth",
            })
          }
        >
          <BackIcon />
        </Flex>
      </Flex>
    </Box>
  )
}
