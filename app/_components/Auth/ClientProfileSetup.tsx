"use client";

import citiesInNigeria from "@/app/_data/citiesInNigeria.json";
import statesInNigeria from "@/app/_data/statesInNigeria.json";
import { Flex } from "@chakra-ui/react";
import { AppInput, SubmitButton } from "./Inputs";
import DownChevron from "@/app/_assets/DownChevron";
import { FormEventHandler, useCallback, useState } from "react";
import useAxios from "@/app/_hooks/useAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const requiredFields = [
  "firstName",
  "lastName",
  "phoneNumber",
  "address",
  "state",
  "city",
];

export default function ClientProfileSetup() {
  const { fetchData, loading } = useAxios({ initialLoadingState: false });
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
  });

  const updateErrorsIfValueIsInvalid = useCallback(
    (name: string, value: string) => {
      if (requiredFields.includes(name)) {
        setErrors((prev) => ({
          ...prev,
          [name]: value.trim() ? "" : "This field is required",
        }));
      }
    },
    [],
  );

  const handleChange = useCallback(
    (name: keyof typeof clientData, value: string) => {
      updateErrorsIfValueIsInvalid(name, value);
      setClientData((prev) => ({ ...prev, [name]: value }));
    },
    [updateErrorsIfValueIsInvalid],
  );

  const checkForAndHandleErrors = useCallback(() => {
    let hasErrors = false;

    Object.entries(clientData).forEach(([key, value]) => {
      if (requiredFields.includes(key) && !value.trim()) {
        hasErrors = true;
        setErrors((prev) => ({
          ...prev,
          [key]: "This field is required",
        }));
      }
    });

    return hasErrors;
  }, [clientData]);

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (checkForAndHandleErrors()) return;

      const res = await fetchData({
        url: "/clients",
        method: "post",
        body: clientData,
      });

      toast.remove();
      if (res?.statusCode === 200 || res?.statusCode === 201) {
        toast.success(res.message || "Client created successfully");
        router.push("/client")
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    },
    [clientData, checkForAndHandleErrors, fetchData],
  );

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      flexDir="column"
      gap="2.4rem"
      w="full"
      maxW="40rem"
    >
      <AppInput
        label="Last name"
        hasError={Boolean(errors.lastName)}
        errorDescription={errors.lastName}
        inputProps={{
          placeholder: "Emmanuela",
          value: clientData.lastName,
          fontSize: "1.4rem",
          onChange: (e) => handleChange("lastName", e.target.value),
        }}
        labelProps={{
          fontWeight: 400,
        }}
      />
      <AppInput
        label="First name"
        hasError={Boolean(errors.firstName)}
        errorDescription={errors.firstName}
        inputProps={{
          placeholder: "Johnbull",
          value: clientData.firstName,
          fontSize: "1.4rem",
          onChange: (e) => handleChange("firstName", e.target.value),
        }}
        labelProps={{
          fontWeight: 400,
        }}
      />
      <AppInput
        label="Phone number"
        hasError={Boolean(errors.phoneNumber)}
        errorDescription={errors.phoneNumber}
        inputProps={{
          type: "tel",
          placeholder: "0803123456",
          fontSize: "1.4rem",
          value: clientData.phoneNumber,
          onChange: (e) => handleChange("phoneNumber", e.target.value),
        }}
        labelProps={{
          fontWeight: 400,
        }}
      />
      <AppInput
        label="Contact address"
        hasError={Boolean(errors.address)}
        errorDescription={errors.address}
        inputProps={{
          placeholder: "No 2 Liverpool street",
          fontSize: "1.4rem",
          value: clientData.address,
          onChange: (e) => handleChange("address", e.target.value),
        }}
        labelProps={{
          fontWeight: 400,
        }}
      />
      <AppInput
        label="State"
        hasError={Boolean(errors.state)}
        errorDescription={errors.state}
        as="select"
        inputRightAddon={<DownChevron />}
        inputProps={{
          value: clientData.state,
          onChange: (e) => {
            handleChange("state", e.target.value);
            handleChange("city", "");
          },
        }}
        labelProps={{
          fontWeight: 400,
        }}
      >
        <option value="">Bewty state</option>
        {statesInNigeria.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </AppInput>

      <AppInput
        label="City"
        hasError={Boolean(errors.city)}
        errorDescription={errors.city}
        as="select"
        inputRightAddon={<DownChevron />}
        inputProps={{
          value: clientData.city,
          onChange: (e) => handleChange("city", e.target.value),
        }}
        labelProps={{
          fontWeight: 400,
        }}
      >
        <option value="">Bewty city</option>
        {(
          citiesInNigeria[clientData.state as keyof typeof citiesInNigeria] ||
          []
        ).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </AppInput>

      <SubmitButton
        isLoading={loading}
        type="submit"
        variant="primary"
        loadingText="Saving client"
        mt="3rem"
      >
        Go to dashboard
      </SubmitButton>
    </Flex>
  );
}
