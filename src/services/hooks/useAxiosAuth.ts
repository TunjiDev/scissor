"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "../axios";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (session?.user?.accessToken) {
          config.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.sent) {
          originalRequest.sent = true;
          await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken, session]);

  return axios;
};

export default useAxiosAuth;
