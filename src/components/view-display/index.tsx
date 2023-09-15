import { SimpleGrid, Box, Text, useMediaQuery, Flex, useColorMode } from "@/components/chakra-provider/chakra";
import Popup from "../pop-up";
import Image from "next/image";
import qrCodeImg from "@/assets/images/qrcode.png";
import { TableType } from "@/types/tableTypes";
import { useClipboard } from "use-clipboard-copy";
import CopyIcon from "@/assets/icons/copy";

interface PropType {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  rowData: TableType;
}

const View = ({ openModal, setOpenModal, rowData }: PropType) => {
  const { colorMode } = useColorMode();
  const [isLowerThan1200] = useMediaQuery("(max-width: 1200px)");
  const clipboard = useClipboard({ copiedTimeout: 600 });

  return (
    <Popup
      maxW={isLowerThan1200 ? "90%" : "60%"}
      popupOpen={openModal}
      setPopupOpen={setOpenModal}
      closeIcon
      closeIconClick={() => setOpenModal(false)}
      description="View"
    >
      <Box bg="brand.white" mt="3rem">
        <SimpleGrid columns={[1, 1, 2]} spacing={10}>
          <Box>
            <Text fontWeight={700}>Short Link</Text>
            <Flex alignItems="center">
              <Text fontWeight={300} fontSize={{ base: "14px", lg: "16px" }} mr=".5rem">
                {`${process.env.NEXT_PUBLIC_BASE_URL}/${rowData.shortUrl}`}
              </Text>
              <Box>
                <CopyIcon
                  onClick={() => clipboard.copy(`${process.env.NEXT_PUBLIC_BASE_URL}/${rowData.shortUrl}`)}
                  cursor="pointer"
                  color={colorMode === "dark" ? "#C9CED6" : "#11161d"}
                />
              </Box>
            </Flex>
            <Text color="#1EB036">{clipboard.copied ? "Copied" : ""}</Text>
          </Box>
          <Box>
            <Text fontWeight={700}>Original Link</Text>
            <Text fontWeight={300} fontSize={{ base: "14px", lg: "16px" }}>
              {rowData.longUrl}
            </Text>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={10} mt="3rem">
          <Box>
            <Text fontWeight={700}>QR Code</Text>
            <Image src={rowData.QrCode?.image || qrCodeImg} alt="QR Code" width={100} height={100} />
          </Box>
          <Box>
            <Text fontWeight={700}>Clicks</Text>
            <Text fontWeight={300} fontSize={{ base: "14px", lg: "16px" }}>
              {rowData.clicks}
            </Text>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={10} mt="3rem">
          <Box>
            <Text fontWeight={700}>Status</Text>
            <Text
              bg={rowData.status ? "#1EB036" : "#B0901E"}
              borderRadius=".5rem"
              p=".5rem"
              fontWeight={300}
              fontSize={{ base: "14px", lg: "16px" }}
            >
              {rowData.status ? "Active" : "Inactive"}
            </Text>
          </Box>
          <Box>
            <Text fontWeight={700}>Date</Text>
            <Text fontWeight={300} fontSize={{ base: "14px", lg: "16px" }}>
              {rowData?.createdAt?.toString() ? rowData.createdAt.toString().split("T")[0] : ""}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Popup>
  );
};

export default View;
