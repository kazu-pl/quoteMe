import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAccessToken } from "common/auth/tokens";
import { API_URL } from "common/constants/env";

import { PATHS_CORE } from "common/constants/paths";

import { logoutQueryKey, logoutQueryValue } from "pages/index";
import { FailedReqMsg } from "types/api.types";

interface ExtendedAxiosConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const axiosSecureInstance = axios.create({
  baseURL: API_URL,
});

axiosSecureInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

axiosSecureInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const error = err as AxiosError;
    const originalConfig = error.config as ExtendedAxiosConfig;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        const tokens = getAccessToken();

        if (!tokens) {
          return axiosSecureInstance(originalConfig);
        }

        // catch error when obtaining new access token failed
        const axiosError = error as AxiosError;

        window.location.href = `${PATHS_CORE.LOGIN}?${logoutQueryKey}=${logoutQueryValue}`;

        if (axiosError.response) {
          if (axiosError.response.data) {
            return Promise.reject(
              typeof axiosError.response.data === "string"
                ? ({ message: axiosError.response.data } as FailedReqMsg)
                : axiosError.response.data
            );
          } else {
            return Promise.reject({
              message:
                "An error occured but server didn't send any data - on refresh",
            } as FailedReqMsg);
          }
        }
        return Promise.reject(axiosError);
      } else {
        if (error.response.data) {
          return Promise.reject(
            typeof error.response.data === "string"
              ? ({ message: error.response.data } as FailedReqMsg)
              : error.response.data
          );
        } else {
          return Promise.reject({
            message: "An error occured but server didn't send any data",
          } as FailedReqMsg);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosSecureInstance;
