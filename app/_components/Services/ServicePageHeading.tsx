"use client"

import PlusIcon from "@/app/_assets/PlusIcon"
import { HStack, Heading, Button, Hide, Show } from "@chakra-ui/react"
import { pageHeadingStyles } from "../Dashboard/WelcomeBackHeading"
import NewServiceForm from "./NewServiceForm"
import { useState } from "react"

export default function ServicePageHeading() {
  const [showNewServiceForm, setShowNewServiceForm] = useState(false)
  return (
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
        onClick={() => setShowNewServiceForm(true)}
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
      <NewServiceForm
        isOpen={showNewServiceForm}
        handleClose={() => setShowNewServiceForm(false)}
        formState="create"
      />
    </HStack>
  )
}
