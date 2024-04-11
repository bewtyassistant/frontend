import { BoxProps, Flex, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import useGetAnimation from "../_hooks/useGetAnimation"

export default function StatisticCard({
  heading,
  text,
  loading,
  ...rest
}: {
  heading: ReactNode
  text: ReactNode
  loading?: boolean
} & BoxProps) {
  if (loading) return <Skeleton {...rest} />
  return (
    <>
      <Flex
        flexDir="column"
        gap={{ base: "2rem", md: "2.5rem" }}
        py={{ base: "4.6rem" }}
        rounded="2rem"
        textAlign="center"
        justify="center"
        alignItems="center"
        {...rest}
      >
        <Heading
          as="h6"
          fontSize={{ base: "3.6rem", md: "4.8rem" }}
          lineHeight={{ base: "4rem", md: "5.4rem" }}
          color="inherit"
        >
          {heading}
        </Heading>
        <Text
          fontSize={{ base: "1.6rem", md: "2rem" }}
          lineHeight={{ base: "1.8rem", md: "2.256rem" }}
          color="inherit"
        >
          {text}
        </Text>
      </Flex>
    </>
  )
}

const Skeleton = (props: BoxProps) => {
  const pulseAnimation = useGetAnimation(`
  0% {
    transform: scale(.96);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.96);
  }`)
  return (
    <Flex
      flexDir="column"
      gap={{ base: "2rem", md: "2.5rem" }}
      py={{ base: "4.6rem" }}
      rounded="2rem"
      textAlign="center"
      justify="center"
      alignItems="center"
      animation={pulseAnimation}
      {...props}
    >
      <Heading
        as="h6"
        height="1.6rem"
        width="80%"
        bgColor="currentColor"
        opacity=".1"
        rounded="1.2rem"
      ></Heading>
      <Text
        height="1rem"
        width="60%"
        opacity=".1"
        bgColor="currentColor"
        rounded="1.2rem"
      ></Text>
    </Flex>
  )
}
