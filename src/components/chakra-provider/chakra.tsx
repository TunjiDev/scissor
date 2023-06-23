"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
export {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
  Tooltip,
  Spinner,
  extendTheme,
  type ThemeConfig,
  theme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Avatar,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import theme from "@/utils/theme";

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
