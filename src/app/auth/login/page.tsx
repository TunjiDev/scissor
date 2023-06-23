"use client";

import React from "react";
import { Box, Text, Flex, useColorMode, useMediaQuery } from "@/components/chakra-provider/chakra";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginSchema } from "@/utils/schema";
import AppInput from "@/components/app-input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import AppButton from "@/components/app-button";
import LoginIcon from "@/assets/icons/login";
import LightIcon from "@/assets/icons/light";
import DarkIcon from "@/assets/icons/dark";
import { LoginType } from "@/types/auth";
import ProtectedPage from "@/utils/auth/ProtectedPage";
import "../../globals.css";

function LoginPage() {
  const [isLowerThan768] = useMediaQuery("(max-width: 767px)");
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const formHook = useForm<LoginType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formHook;

  const submit: SubmitHandler<LoginType> = async (data: any) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.status === 200 && result?.ok) {
        toast.success("Logged in successfully!", {
          id: "success",
        });

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }

      if (result?.error && !result?.ok) {
        toast.error("Invalid Credentials", {
          id: "error",
        });
      }
    } catch (error: any) {
      toast.error(`${error || "An error occurred during login"}`, {
        id: "error",
      });
    }
  };

  return (
    <>
      <Flex direction={"column"} alignItems={"center"} mt={"2.938rem"}>
        <Text
          bg={"radial-gradient(95.19% 12441.23% at 5.56% 79.01%, #EB568E 0%, #144EE3 100%)"}
          fontSize={{ base: "1.5rem", md: "2.307rem" }}
          backgroundClip={"text"}
          fontWeight={800}
          textAlign="center"
        >
          <Link href={"/"}>Scissor</Link>
        </Text>
        <Text fontSize={{ base: ".625rem", md: ".875rem" }} fontWeight={"300"}>
          Ⓢ
        </Text>
      </Flex>

      <Flex h={"80vh"} direction={{ base: "column", md: "row" }} justifyContent={"center"} alignItems={"center"}>
        <Box w={{ base: "90%", md: "50%", lg: "30%" }} m={"auto"}>
          <form onSubmit={handleSubmit(submit)}>
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
              w={"100%"}
              mb={"2rem"}
              isLoading={isSubmitting}
              loadingText="Logging in..."
            >
              <Flex alignItems={"center"}>
                <Text mr={".5rem"}>Login</Text>
                <LoginIcon />
              </Flex>
            </AppButton>

            <Text textAlign={"center"} fontSize={".75rem"} fontWeight={500} mb={"1rem"}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="link">
                Register Here!
              </Link>
            </Text>

            <Text textAlign={"center"} fontSize={".75rem"} fontWeight={500} mb={"1rem"}>
              <Link href="/auth/forgot-password" className="link">
                Forgot Password?
              </Link>
            </Text>
          </form>
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
    </>
  );
}

export default ProtectedPage(LoginPage);
