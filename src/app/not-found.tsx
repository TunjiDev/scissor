import React from "react";
import { Box, Flex, Text } from "@/components/chakra-provider/chakra";
import Link from "next/link";

function NotFound() {
  return (
    <Box>
      <Flex mt={"3rem"} justifyContent={"center"}>
        <Text
          bg={"radial-gradient(95.19% 12441.23% at 5.56% 79.01%, #EB568E 0%, #144EE3 100%)"}
          fontSize={"2.307rem"}
          backgroundClip={"text"}
          fontWeight={800}
        >
          <Link href={"/"}>Scissor</Link>
        </Text>
        <Text fontSize={".875rem"} fontWeight={"300"}>
          Ⓢ
        </Text>
      </Flex>

      <Flex h={"80vh"} justifyContent={"center"} alignItems={"center"}>
        <Text textAlign={"center"} fontSize={"30px"}>
          Oooops! Page Not Found
        </Text>
      </Flex>
    </Box>
  );
}

export default NotFound;
