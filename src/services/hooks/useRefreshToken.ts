"use client";

import { useSession } from "next-auth/react";
import axios from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      if (session?.user.refreshToken) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
          refreshToken: session?.user.refreshToken,
        });

        if (session) {
          session.user.accessToken = response.data.accessToken;
        }
      }
    } catch (error) {}
  };

  return refreshToken;
};
