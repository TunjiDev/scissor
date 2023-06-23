import React from "react";
import AppButton from "../app-button";
import { Box, Flex, useColorMode, useMediaQuery, Text } from "../chakra-provider/chakra";
import LightIcon from "../../assets/icons/light";
import DarkIcon from "../../assets/icons/dark";

function ThemeToggle() {
  const [isLowerThan768] = useMediaQuery("(max-width: 767px)");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w={{ base: "90%", md: "5%" }}
      justifyContent={"center"}
      alignItems={"center"}
      mt={{ base: "2rem", md: "0" }}
      mx={"auto"}
    >
      <Flex p={".2rem"} borderRadius={"3rem"} transform={{ base: "none", md: "rotate(90deg)" }} bg={"#353C4A"}>
        <AppButton
          variant={colorMode === "dark" ? "tertiary" : "primary"}
          onClick={colorMode === "dark" ? toggleColorMode : undefined}
        >
          <Flex alignItems={"center"}>
            <Box mr={".5rem"}>
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
            <Box mr={".5rem"}>
              <DarkIcon />
            </Box>
            {isLowerThan768 ? null : <Text fontWeight={700}>Dark Theme</Text>}
          </Flex>
        </AppButton>
      </Flex>
    </Flex>
  );
}

export default ThemeToggle;
