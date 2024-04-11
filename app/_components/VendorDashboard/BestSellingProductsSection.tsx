import { Box, Flex } from "@chakra-ui/react"
import BestSellingProductCard from "../BestSellingProductCard"
import BackIcon from "@/app/_assets/BackIcon"
import { useRef } from "react"
import DashboardHeading from "./DashboardHeading"

export default function BestSellingProductsSection() {
  const listContainerRef = useRef<HTMLDivElement | null>(null)
  return (
    <Box overflowX="auto" pos="relative" zIndex="0" ref={listContainerRef}>
      <DashboardHeading mb="1.5rem" pos="sticky" left="0">
        Best selling products
      </DashboardHeading>
      <Flex gap={{ base: "3rem", md: "6rem" }} w="max-content" pos="relative">
        <BestSellingProductCard loading bg="#62BEC11A" name={"Face wash"} />
        <BestSellingProductCard loading bg="#FFE3E780" name={"Face wash"} />

        <BestSellingProductCard loading bg="#62BEC11A" name={"Face wash"} />
        <BestSellingProductCard loading bg="#FFE3E780" name={"Face wash"} />
        <BestSellingProductCard loading bg="#62BEC11A" name={"Face wash"} />
        <BestSellingProductCard loading bg="#FFE3E780" name={"Face wash"} />
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
