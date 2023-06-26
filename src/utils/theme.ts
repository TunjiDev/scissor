"use client";

import { extendTheme, type ThemeConfig, theme } from "@/components/chakra-provider/chakra";
// COLOR MODE
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// OTHERS
const colors = Object.freeze({
  bg: {
    white: "#fff",
  },
  brand: {
    main: "#CFE5FF",
    white: "#fff",
    primary: "#144EE3",
    secondary: "#181E29",
  },
  typography: {
    black: "#000",
    dark: "#0D1117",
    darkLighter: "#11161d",
    gray: "#C9CED6",
    blue: "#144EE3",
    darkGray: "#181E29",
  },
});

const fontSizes = Object.freeze({
  ...theme.fontSizes,
  tiny: "1rem",
  small: "1.2rem",
  label: "1.4rem",
  paragraph: "1.6rem",
  heading6: "1.6rem",
  heading5: "1.9rem",
  heading4: "2.4rem",
  heading3: "2.9rem",
  heading2: "3.5rem",
  heading1: "4.3rem",
});

const fontWeights = Object.freeze({
  ...theme.fontWeights,
  small: 300,
  normal: 400,
  regular: 500,
  medium: 550,
  semiBold: 600,
  bold: 700,
  bolder: 800,
  extraBold: 900,
});

export default extendTheme({ config, colors, fontSizes, fontWeights });
