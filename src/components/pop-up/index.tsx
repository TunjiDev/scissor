import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalContentProps, Text } from "@chakra-ui/react";
import { useColorMode } from "../chakra-provider/chakra";

export interface PopupPropType {
  setPopupOpen: (popupOpen: boolean) => void;
  popupOpen: boolean;
  children: JSX.Element | JSX.Element[];
  maxW?: string;
  height?: string;
  description?: string;
  closeIcon?: boolean;
  closeIconClick?: () => void;
  closeOnOverlayClick?: boolean;
  contentProps?: ModalContentProps;
  onCloseComplete?: () => void;
}

const Popup = ({
  setPopupOpen,
  popupOpen,
  maxW,
  children,
  closeIcon,
  height,
  closeIconClick,
  description,
  closeOnOverlayClick,
  contentProps,
  onCloseComplete,
}: PopupPropType) => {
  const closePopup = () => {
    setPopupOpen?.(false);
  };
  const { colorMode } = useColorMode();

  return (
    <Modal
      isOpen={popupOpen}
      closeOnOverlayClick={closeOnOverlayClick || false}
      onClose={closePopup}
      onCloseComplete={onCloseComplete}
      onOverlayClick={closePopup}
    >
      <ModalOverlay />
      <ModalContent
        maxWidth={maxW}
        height={height}
        width="93%"
        position="relative"
        background={colorMode === "light" ? "#C9CED6" : "#0D1117"}
        py={{ base: "1.2rem", md: "4.8rem" }}
        px={{ base: "1.2rem", md: "5.2rem" }}
        {...contentProps}
        color={colorMode === "light" ? "#0D1117" : "#C9CED6"}
      >
        {closeIcon && (
          <ModalCloseButton
            width="1rem"
            height="1rem"
            position="absolute"
            top="2.4rem"
            right="2.4rem"
            outline="none"
            onClick={closeIconClick}
          />
        )}
        {description && (
          <Text fontWeight="bold" fontSize={"30px"} color={colorMode === "light" ? "#0D1117" : "#C9CED6"}>
            {description}
          </Text>
        )}
        {children}
      </ModalContent>
    </Modal>
  );
};

export default Popup;
