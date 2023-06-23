import { SimpleGrid, Box, Text } from "@/components/chakra-provider/chakra";
import Popup from "../pop-up";
import Image from "next/image";
import qrCodeImg from "@/assets/images/qrcode.png";
import { TableType } from "@/types/tableTypes";

interface PropType {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  rowData: TableType;
}

const View = ({ openModal, setOpenModal, rowData }: PropType) => {
  return (
    <Popup
      maxW="40%"
      popupOpen={openModal}
      setPopupOpen={setOpenModal}
      closeIcon
      closeIconClick={() => setOpenModal(false)}
      description="View"
    >
      <Box bg={"brand.white"} mt={"3rem"}>
        <Box>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text fontWeight={700}>Short Link</Text>
              <Text fontWeight={300}>{`https://seazus.onrender.com/${rowData.shortUrl}`}</Text>
            </Box>
            <Box>
              <Text fontWeight={700}>Original Link</Text>
              <Text fontWeight={300}>{rowData.longUrl}</Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box mt={"3rem"}>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text fontWeight={700}>QR Code</Text>
              <Image src={rowData.QrCode?.image || qrCodeImg} alt={"QR Code"} width={100} height={100} />
            </Box>
            <Box>
              <Text fontWeight={700}>Clicks</Text>
              <Text fontWeight={300}>{rowData.clicks}</Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box mt={"3rem"}>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text fontWeight={700}>Status</Text>
              <Text bg={rowData.status ? "#1EB036" : "#B0901E"} borderRadius={".5rem"} p={".5rem"} fontWeight={300}>
                {rowData.status ? "Active" : "Inactive"}
              </Text>
            </Box>
            <Box>
              <Text fontWeight={700}>Date</Text>
              <Text fontWeight={300}>
                {rowData?.createdAt?.toString() ? rowData.createdAt.toString().split("T")[0] : ""}
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Popup>
  );
};

export default View;
