/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Box, Text } from "@/components/chakra-provider/chakra";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, useColorMode } from "@chakra-ui/react";
import MinusIcon from "@/assets/icons/minus";
import PlusIcon from "@/assets/icons/plus";
import Link from "next/link";

function index() {
  const { colorMode } = useColorMode();

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  How does Scissor work?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              Scissor works by taking a long URL and creating a shorter, condensed version that redirects to the
              original URL. When a user clicks on the shortened link, they are redirected to the intended destination.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Is it necessary to create an account to use the URL shortening service?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              Yes it is. Only registered and logged in users can use the URL shortening service.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Are the shortened links permanent? Will they expire?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              Yes they are permanent. They will never expire unless you deactivate or delete them.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Are there any limitations on the number of URLs I can shorten?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              No, there are no limitations on the number of URLs you can shorten.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Can I track the performance of my shortened URLs?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              Yes, you can track the performance of your shortened URLs. You can see the number of clicks the shortened
              URL has received.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  How secure is the URL shortening service? Are the shortened links protected against spam or malicious
                  activity?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              Yes, the shortened links are protected against spam and malicious activity. We use a spam detection
              algorithm to detect and prevent spam and malicious activity.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  What is a QR code and what can it do?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              A QR code is a type of barcode that contains a pattern of black squares on a white background. It can be
              scanned using a QR scanner or a smartphone with built-in camera. QR codes can be used to store different
              types of information such as URLs, contact details, email addresses, etc. You can generate a QR code for
              your shortened URL and share it with your friends or customers. When they scan the QR code, they will be
              redirected to the destination URL.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Text as={"h2"}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Is there an API available for integrating the URL shortening service into my own applications or
                  websites?
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                ) : (
                  <PlusIcon fontSize="12px" color={colorMode === "dark" ? "#C9CED6" : "#11161d"} />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel fontSize={{ base: ".75rem", md: "1rem" }} pb={4}>
              Yes, there is an API available for integrating the URL shortening service into your own applications or
              websites. You can find the documentation for the API
              <Link href="https://seazus.onrender.com/swagger" className="link" target="_blank" rel="noreferrer">
                {" "}
                here
              </Link>
              .
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default index;
