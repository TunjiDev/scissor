"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import theme from "@/utils/theme";

interface PropType extends ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  width?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset" | undefined;
}

const AppButton = ({ children, type, onClick, variant = "primary", width, style, ...rest }: PropType) => {
  return (
    <Button
      onClick={onClick}
      w={width}
      type={type}
      style={style}
      fontWeight={600}
      lineHeight={"1.125"}
      background={
        variant === "primary"
          ? `${theme.colors.brand.primary}`
          : variant === "secondary"
          ? `${theme.colors.brand.secondary}`
          : "transparent"
      }
      _hover={{}}
      color={"#e5e5e5"}
      borderRadius={"3rem"}
      border={variant === "primary" ? "1px solid #144EE3" : variant === "secondary" ? "1px solid #353C4A" : "none"}
      p={"21px 25.1875px 21px 25px"}
      boxShadow={
        variant === "primary"
          ? "10px 9px 22px rgba(20, 78, 227, 0.38)"
          : variant === "secondary"
          ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
          : "none"
      }
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
