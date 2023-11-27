import axios, { isAxiosError } from "axios";

import { ReactNode, useContext, useMemo } from "react";

import { AuthContext } from "../context";

export const instance = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL ?? "http://localhost:8001/api",
  headers: { "Content-Type": "application/json" },
});

const getAuth = () =>
  JSON.parse(localStorage.getItem("token") ?? "{}") as Record<string, null>;

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuth();
    if (config.headers) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const WithAxios = ({ children }: { children?: ReactNode }) => {
  const { setAuthData } = useContext(AuthContext);

  useMemo(() => {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              setAuthData(null);
              return;
            } else {
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }, [setAuthData]);

  return <>{children}</>;
};
