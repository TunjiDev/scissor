"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "../axios";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  const [isRefreshing, setIsRefreshing] = useState(false);

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
          if (!isRefreshing) {
            setIsRefreshing(true);
            try {
              await refreshToken();
              const updatedConfig = { ...originalRequest };
              updatedConfig.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
              return axios(updatedConfig);
            } catch (error) {
              throw error;
            } finally {
              setIsRefreshing(false);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [isRefreshing, refreshToken, session]);

  return axios;
};

export default useAxiosAuth;
