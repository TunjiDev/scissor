import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProviders } from "@/components/chakra-provider/chakra";
import Provider from "./Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scissor",
  description:
    "Scissor is an efficient and easy-to-use URL shortening service that streamlines your online experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
        <Provider>
          <ChakraProviders>{children}</ChakraProviders>
        </Provider>
      </body>
    </html>
  );
}
