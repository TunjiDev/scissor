/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@/components/chakra-provider/chakra";
import AppButton from "@/components/app-button";
import Link from "next/link";
import LoginIcon from "@/assets/icons/login";
import LinkIcon from "@/assets/icons/link";
import EditIcon from "@/assets/icons/edit";
import DeleteIcon from "@/assets/icons/delete";
import ViewIcon from "@/assets/icons/view";
import ChevronDownIcon from "@/assets/icons/chevron-down";
import NoDataIcon from "@/assets/icons/no-data";
import DataTable, { TableColumn } from "react-data-table-component";
import { TableType } from "@/types/tableTypes";
import { useCustomStyles } from "@/utils/customTableStyles";
import Edit from "@/components/edit-display";
import View from "@/components/view-display";
import { useRouter } from "next/navigation";
import { AppTag } from "@/components/tag";
import Image from "next/image";
import qrCodeImg from "@/assets/images/qrcode.png";
import { useSession, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shortenUrlSchema } from "@/utils/schema";
import useAxiosAuth from "@/services/hooks/useAxiosAuth";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import RightArrowIcon from "@/assets/icons/right-arrow";
import ThemeToggle from "@/components/theme-toggle";

function Home() {
  const { colorMode } = useColorMode();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [row, setRow] = useState<TableType>({} as TableType);
  const { data: session } = useSession();
  const [isLowerThan768] = useMediaQuery("(max-width: 767px)");
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const formHook = useForm({
    resolver: yupResolver(shortenUrlSchema),
    defaultValues: {
      longUrl: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = formHook;

  const fetcher = async (url: string) => {
    const response = await axiosAuth.get(url);
    return response.data;
  };

  const { data: userUrls, isLoading } = useSWR(
    session ? `${process.env.NEXT_PUBLIC_BASE_URL}/user/urls` : null,
    fetcher
  );

  const deleteHandler = async (data: TableType) => {
    try {
      const response = await axiosAuth.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/url/${data.id}`);

      if (response.status === 200) {
        toast.success(response?.data.message, {
          id: "success",
        });

        mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/user/urls`);
      }
    } catch (error: any) {
      return toast.error(`${error?.response?.data?.message || "An error occurred during the process"}`, {
        id: "error",
      });
    }
  };

  const submit = async (data: any) => {
    if (session) {
      const sendRequest = async (url: string, data: any) => {
        try {
          const response = await axiosAuth.post(url, data);

          if (response.status === 201 || response.status === 200) {
            reset();

            toast.success(response?.data.message, {
              id: "success",
            });

            await axiosAuth.post(`${process.env.NEXT_PUBLIC_BASE_URL}/url/${response?.data.result.id}/qrcode`);
            mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/user/urls`);
          }
        } catch (error: any) {
          return toast.error(`${error?.response?.data?.message || "An error occurred during the process"}`, {
            id: "error",
          });
        }
      };

      await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/url`, data);
    }

    if (!session)
      return toast.error("You must be logged in to use our service! Kindly sign in.", {
        id: "error",
      });
  };

  const columns: TableColumn<TableType>[] = [
    {
      name: "Short Link",
      cell: (row) => `https://seazus.onrender.com/${row.shortUrl}`,
    },
    {
      name: "Original Link",
      cell: (row) => row.longUrl,
    },
    {
      name: "QR Code",
      center: true,
      cell: (row) => {
        return (
          <Box>
            {session && row.QrCode?.image && <Image src={row.QrCode?.image} alt={"QR Code"} width={50} height={40} />}
            {session && !row.QrCode?.image && <Image src={qrCodeImg} alt={"QR Code"} width={50} height={40} />}
          </Box>
        );
      },
    },
    {
      name: "Clicks",
      selector: (row) => row.clicks,
      center: true,
    },
    {
      name: "Status",
      cell: (row) => <AppTag label={row.status ? "Active" : "Inactive"} />,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toISOString().split("T")[0],
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => {
        return (
          <Flex>
            <Box mr={"1rem"}>
              <ViewIcon
                cursor={"pointer"}
                color={colorMode === "dark" ? "#C9CED6" : "#11161d"}
                onClick={() => {
                  setRow(row);
                  setOpenViewModal(true);
                }}
              />
            </Box>
            <Box mr={"1rem"}>
              <EditIcon
                cursor={"pointer"}
                color={colorMode === "dark" ? "#C9CED6" : "#11161d"}
                onClick={() => {
                  setRow(row);
                  setOpenEditModal(true);
                }}
              />
            </Box>
            <Box>
              <DeleteIcon
                cursor={"pointer"}
                color={colorMode === "dark" ? "#C9CED6" : "#11161d"}
                onClick={() => deleteHandler(row)}
              />
            </Box>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted)
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"20rem"}>
        <Spinner />
      </Flex>
    );

  return (
    <Box pt={{ base: "1rem", md: "2.938rem" }} px={{ base: ".25rem", sm: "1.25rem", md: "2.25rem", lg: "3.25rem" }}>
      {/* HEADER */}
      <Flex
        as={"header"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex>
          <Text
            bg={"radial-gradient(95.19% 12441.23% at 5.56% 79.01%, #EB568E 0%, #144EE3 100%)"}
            fontSize={{ base: "1.807rem", md: "2.307rem" }}
            backgroundClip={"text"}
            fontWeight={800}
          >
            <Link href={"/"}>Scissor</Link>
          </Text>
          <Text fontSize={".875rem"} fontWeight={"300"}>
            Ⓢ
          </Text>
        </Flex>

        <Flex alignItems={"center"} mt={{ base: "1rem", md: 0 }}>
          {session?.user ? (
            <Menu>
              <MenuButton
                bg={colorMode === "dark" ? "#11161d" : "#C9CED6"}
                border={"1px solid #353C4A"}
                boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.1)"}
                p={"10px 15px"}
                borderRadius={"3rem"}
                fontWeight={600}
                mr={"1.25rem"}
              >
                <Flex alignItems={"center"}>
                  <Text mr={".5rem"}>Welcome {session.user.firstName}</Text>{" "}
                  <ChevronDownIcon color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/profile")}>View Profile</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <AppButton variant={"secondary"} mr={"1.25rem"} onClick={() => router.push("/auth/login")}>
              <Flex alignItems={"center"}>
                <Text mr={".5rem"}>Login</Text>
                <LoginIcon />
              </Flex>
            </AppButton>
          )}

          {session?.user ? (
            <AppButton variant={"primary"} onClick={() => signOut()}>
              Sign Out
            </AppButton>
          ) : (
            <AppButton variant={"primary"} onClick={() => router.push("/auth/register")}>
              Register Now
            </AppButton>
          )}
        </Flex>
      </Flex>

      {/* MAIN */}
      <Flex as={"main"} flexDirection={{ base: "column", md: "row" }} flexWrap="wrap">
        <Box w={{ base: "90%", md: "95%" }} mx={"auto"}>
          <Text
            bg={"linear-gradient(89.92deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)"}
            backgroundClip={"text"}
            fontWeight={800}
            fontSize={{ base: "1.75rem", sm: "2.75rem", md: "3.75rem" }}
            lineHeight={{ base: "2.5rem", sm: "4rem", md: "5rem" }}
            textAlign={"center"}
            mt={"4rem"}
          >
            Shorten Your Loooong Links :)
          </Text>

          <Text
            lineHeight={"1.5rem"}
            textAlign={"center"}
            mt={"1.25rem"}
            fontWeight={300}
            fontSize={{ base: ".75rem", md: "1rem" }}
          >
            Scissor is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </Text>

          <Box w={{ sm: "21.188rem", md: "31.188rem", lg: "41.188rem" }} m={"auto"}>
            <form onSubmit={handleSubmit(submit)}>
              <InputGroup
                mt={"2.875rem"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                border={"3px solid #353C4A"}
                borderRadius={"3rem"}
                h={"4rem"}
                px={{ base: ".5rem", md: "1rem" }}
              >
                <InputLeftElement mt={".5rem"} ml={".5rem"}>
                  <LinkIcon color="green.500" />
                </InputLeftElement>
                <Input
                  placeholder="Enter the link here"
                  boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.1)"}
                  border={"none"}
                  focusBorderColor="transparent"
                  _placeholder={{ color: "#C9CED6" }}
                  lineHeight={"1.75rem"}
                  w={"75%"}
                  {...register("longUrl", { required: true })}
                />
                <InputRightElement mt={".5rem"} w={{ base: "5.25rem", md: "11.25rem" }}>
                  {isLowerThan768 ? (
                    <AppButton variant={"primary"} type="submit" isLoading={isSubmitting} w={"80%"}>
                      <RightArrowIcon />
                    </AppButton>
                  ) : (
                    <AppButton variant={"primary"} type="submit" isLoading={isSubmitting} loadingText="Shortening...">
                      Shorten Now!
                    </AppButton>
                  )}
                </InputRightElement>
              </InputGroup>
              {errors.longUrl && (
                <Text mt={"1rem"} color={"#EB568E"} textAlign={"center"}>
                  {errors.longUrl.message}
                </Text>
              )}
            </form>
          </Box>

          {/* TABLE */}
          <Box mt={"2.5rem"}>
            {!session ? (
              <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                <Text>No Links Found, please register or login to use our services!</Text>
                <NoDataIcon />
              </Flex>
            ) : session && isLoading ? (
              <Flex justifyContent={"center"} alignItems={"center"} h={"20rem"}>
                <Spinner />
              </Flex>
            ) : session && !isLoading && userUrls?.length > 0 ? (
              <DataTable columns={columns} data={userUrls} customStyles={useCustomStyles()} />
            ) : (
              <Flex justifyContent={"center"} alignItems={"center"} h={"20rem"}>
                <Text>No Links Found</Text>
              </Flex>
            )}
          </Box>
        </Box>

        {/* THEME TOGGLE */}
        <ThemeToggle />
      </Flex>

      {/* MODALS */}
      <View openModal={openViewModal} setOpenModal={setOpenViewModal} rowData={row} />
      <Edit openModal={openEditModal} setOpenModal={setOpenEditModal} rowData={row} />

      {/* FOOTER */}
      <Box
        as={"footer"}
        textAlign={"center"}
        mt={"2.5rem"}
        bg={colorMode === "dark" ? "#0D1117" : "#C9CED6"}
        py={"1rem"}
        fontSize={{ base: ".75rem", md: "1rem" }}
      >
        Created by @TunjiDev, designed by @mohammedhijas of figma community. ALL RIGHTS RESERVED.
      </Box>
    </Box>
  );
}

export default Home;
