import { useEffect } from "react";
import { Box, Text, Input, Flex, useMediaQuery } from "@/components/chakra-provider/chakra";
import Popup from "../pop-up";
import { TableType } from "@/types/tableTypes";
import { set, useForm } from "react-hook-form";
import { shortenUrlSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import AppButton from "../app-button";
import useAxiosAuth from "@/services/hooks/useAxiosAuth";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface PropType {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  rowData: TableType;
}

const Edit = ({ openModal, setOpenModal, rowData }: PropType) => {
  const [isLowerThan1200] = useMediaQuery("(max-width: 1200px)");
  const axiosAuth = useAxiosAuth();

  const formHook = useForm({
    resolver: yupResolver(shortenUrlSchema),
    defaultValues: {
      longUrl: rowData.longUrl,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = formHook;

  useEffect(() => {
    if (openModal) {
      reset();
    }
  }, [openModal, reset]);

  const submit = async (data: any) => {
    const sendRequest = async (url: string, data: any) => {
      try {
        const response = await axiosAuth.patch(url, data);

        if (response.status === 201 || response.status === 200) {
          setOpenModal(false);
          reset();

          toast.success(response?.data.message, {
            id: "success",
          });
          mutate(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user/urls`);
        }
      } catch (error: any) {
        return toast.error(`${error?.response?.data?.message || "An error occurred during the process"}`, {
          id: "error",
        });
      }
    };

    await sendRequest(`${process.env.NEXT_PUBLIC_BASE_URL_API}/url/${rowData.id}`, data);
  };

  return (
    <Popup
      maxW={isLowerThan1200 ? "90%" : "40%"}
      popupOpen={openModal}
      setPopupOpen={setOpenModal}
      closeIcon
      closeIconClick={() => setOpenModal(false)}
      description="Edit"
    >
      <Box bg={"brand.white"} mt={"3rem"}>
        <form onSubmit={handleSubmit(submit)}>
          <Box mb={"2rem"}>
            <Text fontWeight={700} mb={"1rem"}>
              Original Link
            </Text>
            <Input
              placeholder="original link"
              defaultValue={rowData.longUrl}
              {...register("longUrl", { required: true })}
            />
          </Box>

          {errors.longUrl && (
            <Text mb={"2rem"} color={"#EB568E"} textAlign={"center"}>
              {errors.longUrl.message}
            </Text>
          )}

          <Flex justifyContent={"flex-end"}>
            <AppButton variant={"primary"} type="submit" isLoading={isSubmitting} loadingText="Saving...">
              Save
            </AppButton>
          </Flex>
        </form>
      </Box>
    </Popup>
  );
};

export default Edit;
