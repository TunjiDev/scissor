"use client";

import React from "react";
import { Box, SimpleGrid, Text, Avatar, Flex, Spinner } from "@/components/chakra-provider/chakra";
import useSWR from "swr";
import Link from "next/link";
import useAxiosAuth from "@/services/hooks/useAxiosAuth";
import toast from "react-hot-toast";
import { changePasswordSchema } from "@/utils/schema";
import { ChangePasswordType } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "@/services/axios";
import AppInput from "@/components/app-input";
import AppButton from "@/components/app-button";
import ProtectedPage from "@/utils/auth/ProtectedPage";

function ProfilePage() {
  const axiosAuth = useAxiosAuth();

  const formHook = useForm<ChangePasswordType>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = formHook;

  //Fetch user profile
  const fetcher = async (url: string) => {
    const response = await axiosAuth.get(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, fetcher);

  if (isLoading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Spinner />
      </Flex>
    );
  }

  //Submit change password
  const submit = async (data: ChangePasswordType) => {
    const sendRequest = async (url: string, data: ChangePasswordType) => {
      try {
        const response = await axios.patch(url, data);

        if (response.status === 201 || response.status === 200) {
          toast.success(response?.data.message, {
            id: "success",
          });

          reset();
        }
      } catch (error: any) {
        return toast.error(`${error?.response?.data?.message || "An error occurred during verification"}`, {
          id: "error",
        });
      }
    };

    await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`, data);
  };

  return (
    <Box px={{ base: "1.5rem", lg: "3rem" }}>
      <Flex justifyContent={"center"} mt={"1rem"}>
        <Text
          bg={"radial-gradient(95.19% 12441.23% at 5.56% 79.01%, #EB568E 0%, #144EE3 100%)"}
          fontSize={{ base: "1.807rem", md: "2.307rem" }}
          backgroundClip={"text"}
          fontWeight={800}
        >
          <Link href={"/"}>Scissor</Link>
        </Text>
        <Text fontSize={{ base: ".5rem", lg: ".875rem" }} fontWeight={"300"}>
          Ⓢ
        </Text>
      </Flex>

      <Box>
        <Text fontWeight={600} fontSize={{ base: "1.2rem", lg: "2rem" }}>
          Profile
        </Text>

        {data && (
          <>
            <Flex mt={"2rem"}>
              <Avatar size="xl" name={`${data.firstName} ${data.lastName}`} src="" />
            </Flex>

            <Box mt={"3rem"}>
              <Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <Box>
                    <Text fontWeight={700}>First Name</Text>
                    <Text fontWeight={300}>{data.firstName}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight={700}>Last Name</Text>
                    <Text fontWeight={300}>{data.lastName}</Text>
                  </Box>
                </SimpleGrid>
              </Box>

              <Box mt={"3rem"}>
                <Text fontWeight={700}>Email Address</Text>
                <Text fontWeight={300}>{data.email}</Text>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Box mt={"3rem"}>
        <Text fontWeight={600} fontSize={{ base: "1.2rem", lg: "2rem" }}>
          Change Password
        </Text>

        <Box mb={"2rem"}>
          <hr />
        </Box>

        <Box>
          <form onSubmit={handleSubmit(submit)}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={"2rem"}>
              <Box>
                <AppInput
                  register={register("currentPassword")}
                  errorMessage={errors?.currentPassword?.message}
                  label={"Current Password"}
                  type="password"
                  placeholder="*********"
                />
              </Box>
              <Box>
                <AppInput
                  register={register("newPassword")}
                  errorMessage={errors?.newPassword?.message}
                  label={"New Password"}
                  type="password"
                  placeholder="*********"
                />
              </Box>
            </SimpleGrid>

            <AppButton
              variant="primary"
              type="submit"
              w={"100%"}
              mb={"2rem"}
              isLoading={isSubmitting}
              loadingText="Submitting..."
            >
              <Flex alignItems={"center"}>
                <Text mr={".5rem"}>Submit</Text>
              </Flex>
            </AppButton>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default ProtectedPage(ProfilePage);
