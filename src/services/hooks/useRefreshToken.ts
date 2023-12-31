"use client";

import { useSession, signOut } from "next-auth/react";
import axios from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      if (session?.user.refreshToken) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/refresh-token`, {
          refreshToken: session?.user.refreshToken,
        });

        if (session) {
          session.user.accessToken = response.data.accessToken;
        }
      }
    } catch (error) {
      await signOut();
    }
  };

  return refreshToken;
};
