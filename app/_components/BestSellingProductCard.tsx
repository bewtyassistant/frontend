import { BoxProps, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import useGetAnimation from "../_hooks/useGetAnimation"

export default function BestSellingProductCard({
  name,
  loading,
  ...rest
}: {
  name: ReactNode
  loading?: boolean
} & BoxProps) {
  if (loading) return <Skeleton {...rest} />
  return (
    <>
      <Flex
        flexDir="column"
        w={{ base: "13.8rem", sm: "20rem" }}
        h={{ base: "13.8rem", sm: "20rem" }}
        gap={{ base: "1rem", md: "1.5rem" }}
        rounded="full"
        textAlign="center"
        justify="center"
        alignItems="center"
        {...rest}
      >
        <Image src="/images/face-wash.png" w="50%" h="auto" />
        <Text
          fontSize={{ base: "1.4rem", md: "1.6rem" }}
          color="#9FA3AD"
          lineHeight="125%"
        >
          {name}
        </Text>
      </Flex>
    </>
  )
}

const Skeleton = (props: BoxProps) => {
  const pulseAnimation = useGetAnimation()
  return (
    <Flex
      flexDir="column"
      py={{ base: "4.6rem" }}
      w={{ base: "13.8rem", sm: "20rem" }}
      h={{ base: "13.8rem", sm: "20rem" }}
      gap={{ base: "1rem", md: "1.5rem" }}
      rounded="full"
      textAlign="center"
      justify="center"
      alignItems="center"
      animation={pulseAnimation}
      {...props}
    >
      <Flex
        w={{ base: "4rem", sm: "10rem" }}
        h={{ base: "8rem", sm: "10rem" }}
        bg="#9FA3AD"
        opacity=".1"
        rounded="50%"
      ></Flex>
      <Text
        h={{ base: "1.4rem", md: "1.6rem" }}
        w="40%"
        bg="#9FA3AD"
        rounded="1.2rem"
        opacity=".1"
      ></Text>
    </Flex>
  )
}
