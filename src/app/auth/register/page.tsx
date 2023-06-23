"use client";

import React from "react";
import { Box, Text, Flex, useColorMode, useMediaQuery } from "@/components/chakra-provider/chakra";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "@/services/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { RegisterSchema } from "@/utils/schema";
import AppInput from "@/components/app-input";
import AppButton from "@/components/app-button";
import LightIcon from "@/assets/icons/light";
import DarkIcon from "@/assets/icons/dark";
import Link from "next/link";
import { RegisterType } from "@/types/auth";
import { useRouter } from "next/navigation";
import ProtectedPage from "@/utils/auth/ProtectedPage";
import "../../globals.css";

function RegisterPage() {
  const [isLowerThan768] = useMediaQuery("(max-width: 767px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const formHook = useForm<RegisterType>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formHook;

  const submit: SubmitHandler<RegisterType> = async (data: any) => {
    const sendRequest = async (url: string, data: RegisterType) => {
      try {
        const response = await axios.post(url, data);

        if (response.status === 201 || response.status === 200) {
          toast.success("Registration successful", {
            id: "success",
          });

          localStorage.setItem("userId", response.data.user.id);

          setTimeout(() => {
            router.push("/auth/verify");
          }, 2000);
        }
      } catch (error: any) {
        return toast.error(`${error?.response?.data?.message || "An error occurred during registration"}`, {
          id: "error",
        });
      }
    };

    await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, data);
  };

  return (
    <Box>
      <Flex justifyContent={"center"} mt={"1rem"}>
        <Text
          bg={"radial-gradient(95.19% 12441.23% at 5.56% 79.01%, #EB568E 0%, #144EE3 100%)"}
          fontSize={{ base: "1.5rem", md: "2.307rem" }}
          backgroundClip={"text"}
          fontWeight={800}
        >
          <Link href={"/"}>Scissor</Link>
        </Text>
        <Text fontSize={".875rem"} fontWeight={"300"}>
          Ⓢ
        </Text>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={"center"} mt={"2rem"}>
        <Box w={{ base: "90%", md: "50%", lg: "30%" }} m={"auto"}>
          <form onSubmit={handleSubmit(submit)} style={{ width: "100%" }}>
            <Box mb={"2rem"}>
              <AppInput
                register={register("firstName")}
                errorMessage={errors?.firstName?.message}
                label={"First Name"}
                isRequired
                placeholder="e.g John"
              />
            </Box>

            <Box mb={"2rem"}>
              <AppInput
                register={register("lastName")}
                errorMessage={errors?.lastName?.message}
                label={"Last Name"}
                isRequired
                placeholder="e.g Doe"
              />
            </Box>

            <Box mb={"2rem"}>
              <AppInput
                register={register("email")}
                errorMessage={errors?.email?.message}
                label={"Email"}
                isRequired
                type={"email"}
                placeholder="Email Address"
              />
            </Box>

            <Box mb={"2rem"}>
              <AppInput
                register={register("password")}
                errorMessage={errors?.password?.message}
                label={"Password"}
                type="password"
                placeholder="*********"
              />
            </Box>

            <AppButton
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              w={"100%"}
              mb={"2rem"}
              loadingText={"Register"}
            >
              Register
            </AppButton>
          </form>

          <Text textAlign={"center"} fontSize={".75rem"} fontWeight={500} mb={"1rem"}>
            Already have an account?{" "}
            <Link href="/auth/login" className="link">
              Login!
            </Link>
          </Text>
        </Box>

        <Flex
          w={{ base: "90%", md: "5%" }}
          justifyContent={{ base: "center", md: "flex-end" }}
          alignItems={"center"}
          borderRadius={"3rem"}
          mt={{ base: "2rem", md: "0" }}
        >
          <Flex p={".2rem"} borderRadius={"3rem"} transform={{ base: "none", md: "rotate(90deg)" }} bg={"#353C4A"}>
            <AppButton
              variant={colorMode === "dark" ? "tertiary" : "primary"}
              onClick={colorMode === "dark" ? toggleColorMode : undefined}
            >
              <Flex alignItems={"center"}>
                <Box mr={".2rem"}>
                  <LightIcon />
                </Box>
                {isLowerThan768 ? null : <Text fontWeight={300}>Light</Text>}
              </Flex>
            </AppButton>

            <AppButton
              variant={colorMode === "light" ? "tertiary" : "primary"}
              onClick={colorMode === "light" ? toggleColorMode : undefined}
            >
              <Flex alignItems={"center"}>
                <Box mr={".2rem"}>
                  <DarkIcon />
                </Box>
                {isLowerThan768 ? null : <Text fontWeight={700}>Dark Theme</Text>}
              </Flex>
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProtectedPage(RegisterPage);
