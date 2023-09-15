"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@/components/chakra-provider/chakra";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "@/services/axios";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyTokenSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import AppInput from "@/components/app-input";
import AppButton from "@/components/app-button";
import { VerifyTokenType } from "@/types/auth";
import PortectedPage from "@/utils/auth/ProtectedPage";

function VerifyPage() {
  const router = useRouter();
  const [userIdState, setUserIdState] = useState<string>("");

  useEffect(() => {
    const userId = typeof window !== "undefined" && localStorage.getItem("userId");

    if (userId) {
      setUserIdState(userId);
    }
  }, []);

  const formHook = useForm({
    resolver: yupResolver(verifyTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formHook;

  const submit = async (data: VerifyTokenType) => {
    const sendRequest = async (url: string, data: VerifyTokenType) => {
      try {
        const response = await axios.post(url, data);

        if (response.status === 201 || response.status === 200) {
          toast.success(response?.data.message, {
            id: "success",
          });

          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      } catch (error: any) {
        return toast.error(`${error?.response?.data?.message || "An error occurred during verification"}`, {
          id: "error",
        });
      }
    };

    await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/verify-email/${userIdState}`, data);
  };

  return (
    <Box w="100%" p={4}>
      <Flex justifyContent="center" mt={4}>
        <Text
          bg={"radial-gradient(95.19% 12441.23% at 5.56% 79.01%, #EB568E 0%, #144EE3 100%)"}
          fontSize={{ base: "2rem", md: "2.307rem" }}
          backgroundClip="text"
          fontWeight={800}
        >
          <Link href={"/"}>Scissor</Link>
        </Text>
        <Text fontSize=".875rem" fontWeight={300}>
          Ⓢ
        </Text>
      </Flex>

      <Box mt={8} w={{ base: "90%", md: "50%" }} mx="auto">
        <form onSubmit={handleSubmit(submit)} style={{ width: "100%" }}>
          <Flex direction={{ base: "column", md: "row" }} alignItems={{ base: "flex-start", md: "center" }}>
            <AppInput
              w={{ base: "100%", md: "90%" }}
              mb={{ base: 4, md: 0 }}
              mr={{ base: 0, md: "2rem" }}
              register={register("token")}
              isRequired
              errorMessage={errors?.token?.message}
              placeholder="Enter verification code"
            />
            <AppButton
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Verifying..."
              w={{ base: "100%", md: "auto" }}
            >
              Verify
            </AppButton>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default PortectedPage(VerifyPage);
