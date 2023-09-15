"use client";

import AppButton from "@/components/app-button";
import AppInput from "@/components/app-input";
import { Box, Flex, Text } from "@/components/chakra-provider/chakra";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import axios from "@/services/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { ResetPasswordType } from "@/types/auth";
import ProtectedPage from "@/utils/auth/ProtectedPage";

function ResetPasswordPage() {
  const router = useRouter();
  const [userIdState, setUserIdState] = useState<string>("");

  useEffect(() => {
    const userId = typeof window !== "undefined" && localStorage.getItem("userId");

    if (userId) {
      setUserIdState(userId);
    }
  }, []);

  const formHook = useForm<ResetPasswordType>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      newPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formHook;

  const submit = async (data: ResetPasswordType) => {
    const sendRequest = async (url: string, data: ResetPasswordType) => {
      try {
        const response = await axios.patch(url, data);

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

    await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/reset-password?userId=${userIdState}`, data);
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

      <Box w={{ base: "90%", md: "50%", lg: "40%" }} m="auto" mt={4}>
        <form onSubmit={handleSubmit(submit)}>
          <Box mb={4}>
            <AppInput
              register={register("token")}
              errorMessage={errors?.token?.message}
              label="Token"
              isRequired
              placeholder="Enter Token"
            />
          </Box>

          <Box mb={4}>
            <AppInput
              register={register("newPassword")}
              errorMessage={errors?.newPassword?.message}
              label="New Password"
              type="password"
              placeholder="*********"
            />
          </Box>

          <AppButton
            variant="primary"
            type="submit"
            w="100%"
            mb={4}
            isLoading={isSubmitting}
            loadingText="Resetting..."
          >
            <Flex alignItems="center">
              <Text mr={2}>Reset</Text>
            </Flex>
          </AppButton>
        </form>
      </Box>
    </Box>
  );
}

export default ProtectedPage(ResetPasswordPage);
