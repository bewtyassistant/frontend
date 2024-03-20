import { Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import BackIcon from "../_assets/BackIcon"


export default function BackButton(){
  const router = useRouter()
  return (
    <Text
      as="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap=".5rem"
      lineHeight="1.6rem"
      fontSize="1.4rem"
      color="brand.main"
      onClick={() => router.back()}
    >
      <BackIcon /> Back
    </Text>
  )
}