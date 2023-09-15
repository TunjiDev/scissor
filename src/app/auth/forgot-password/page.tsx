"use client";

import { Box, Flex, Text } from "@/components/chakra-provider/chakra";
import axios from "@/services/axios";
import Link from "next/link";
import AppInput from "@/components/app-input";
import AppButton from "@/components/app-button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { ForgotPasswordtype } from "@/types/auth";
import ProtectedPage from "@/utils/auth/ProtectedPage";

function ForgotPasswordPage() {
  const router = useRouter();

  const formHook = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formHook;

  const submit = async (data: any) => {
    const sendRequest = async (url: string, data: ForgotPasswordtype) => {
      try {
        const response = await axios.post(url, data);

        if (response.status === 201 || response.status === 200) {
          toast.success("Email Sent successfully!", {
            id: "success",
          });

          setTimeout(() => {
            router.push("/auth/reset-password");
          }, 2000);
        }
      } catch (error: any) {
        return toast.error(`${error?.response?.data?.message || "Something went wrong"}`, {
          id: "error",
        });
      }
    };

    await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/forgot-password`, data);
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
              register={register("email")}
              isRequired
              errorMessage={errors?.email?.message}
              placeholder="Enter Email Address"
            />
            <AppButton
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending..."
              w={{ base: "100%", md: "auto" }}
            >
              Send
            </AppButton>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default ProtectedPage(ForgotPasswordPage);
