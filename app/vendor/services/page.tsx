"use client"
import PlusIcon from "@/app/_assets/PlusIcon"
import { pageHeadingStyles } from "@/app/_components/Dashboard/WelcomeBackHeading"
import BasicPageLayout from "@/app/_components/Layouts/BasicPageLayout"
import MobileSearchHeader from "@/app/_components/Layouts/MobileSearchHeader"
import { Button, Heading, Hide, HStack, Show } from "@chakra-ui/react"

export default function VendorOverviewPage() {
  return (
    <BasicPageLayout>
      <MobileSearchHeader />
      <HStack
        pos="relative"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: "1.6rem", md: "3rem" }}
      >
        <Heading as="h1" {...pageHeadingStyles}>
          My Services
        </Heading>
        <Button
          variant="filled"
          px={{ base: "1rem", md: "1.6rem" }}
          py={{ base: "1rem", md: "1.4rem" }}
          gap="1rem"
          alignItems="center"
          display="flex"
        >
          <>
            <Hide below="md">
              New Service <PlusIcon />
            </Hide>
            <Show below="md">
              <PlusIcon />
            </Show>
          </>
        </Button>
      </HStack>
    </BasicPageLayout>
  )
}
