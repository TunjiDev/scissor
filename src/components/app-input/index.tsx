"use client";

import React, { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  ResponsiveValue,
  FlexProps,
  Flex,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import themes from "../../utils/theme";

type AppInputProps = {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  control?: any;
  placeholder?: string;
  focusBorderColor?: string;
  register?: any;
  variant?: ResponsiveValue<(string & {}) | "outline" | "filled" | "flushed" | "unstyled">;
} & FlexProps;

export const generalStyle = {
  height: "3rem",
  backgroundColor: "#FCFCFC",
  border: "0.4px solid rgba(15, 99, 255, 0.08)",
  borderRadius: "4px",
  color: "#000",
  fontSize: themes.fontSizes.small,
  fontWeight: themes.fontWeights.normal,
};

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    { label, errorMessage, isRequired, type, placeholder, variant, control, defaultValue, id, register, ...rest },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => setShow(!show);
    const { colorMode } = useColorMode();

    return (
      <FormControl isRequired={isRequired && isRequired}>
        {label && type !== "password" ? (
          <FormLabel
            htmlFor={id}
            fontSize={themes.fontSizes.small}
            fontWeight="500"
            color={colorMode === "dark" ? "#C9CED6" : "#11161d"}
          >
            {label}
          </FormLabel>
        ) : label && type === "password" ? (
          <FormLabel
            htmlFor={id}
            fontSize={themes.fontSizes.small}
            fontWeight="500"
            color={colorMode === "dark" ? "#C9CED6" : "#11161d"}
          >
            <Flex justifyContent={"space-between"}>
              <Box>{label}</Box>
              {show ? (
                <Box onClick={handleClick} cursor={"pointer"}>
                  Hide
                </Box>
              ) : (
                <Box onClick={handleClick} cursor={"pointer"}>
                  Show
                </Box>
              )}
            </Flex>
          </FormLabel>
        ) : null}
        <Input
          fontSize={"1rem"}
          height={"3rem"}
          fontWeight="400"
          _placeholder={{ fontSize: "1rem", color: `${colorMode === "dark" ? "#C9CED6" : "#11161d"}` }}
          variant={variant}
          placeholder={placeholder}
          type={type !== "password" ? "text" : show ? "text" : "password"}
          {...rest}
          ref={ref}
          {...register}
        />
        {errorMessage && (
          <FormHelperText fontSize="1rem" color="red">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

AppInput.displayName = "AppInput";
export default AppInput;
