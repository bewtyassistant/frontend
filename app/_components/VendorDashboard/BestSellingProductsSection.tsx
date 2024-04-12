import { Box, Flex } from "@chakra-ui/react"
import BestSellingProductCard from "../BestSellingProductCard"
import BackIcon from "@/app/_assets/BackIcon"
import { useRef } from "react"
import DashboardHeading from "./DashboardHeading"
import Store from "@/app/_types/Store"

const productBgColors = {
  0: "#62BEC11A",
  1: "#FFE3E780",
}
export default function BestSellingProductsSection({
  loading,
  bestSellingProducts = [],
}: {
  loading?: boolean
  bestSellingProducts?: Store["bestSellingProducts"]
}) {
  const listContainerRef = useRef<HTMLDivElement | null>(null)
  if (!loading && bestSellingProducts.length === 0) return null
  return (
    <Box overflowX="auto" pos="relative" zIndex="0" ref={listContainerRef}>
      <DashboardHeading mb="1.5rem" pos="sticky" left="0">
        Best selling products
      </DashboardHeading>
      <Flex gap={{ base: "3rem", md: "6rem" }} w="max-content" pos="relative">
        {bestSellingProducts.map((product, index) => (
          <BestSellingProductCard
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
            <BestSellingProductCard loading={loading} bg="#62BEC11A" name="" />
            <BestSellingProductCard loading={loading} bg="#FFE3E780" name="" />
            <BestSellingProductCard loading={loading} bg="#62BEC11A" name="" />
            <BestSellingProductCard loading={loading} bg="#FFE3E780" name="" />
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
