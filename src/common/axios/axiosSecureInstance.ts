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
    // "Content-Type": "application/json", // ALTERNATIVE: if you hardcode content-type you don't need to parse body after refreshing accessToken. You also won't need to checking if body is instance of FormData
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
        // history.push(PATHS_CORE.LOGOUT); // TODO: this won't work in react-router 6. You will get pushed to /logout but application won't be pushed to that url. Just url will change. Instead, use  window.location.href which will reload application

        // alert("you were logged out due to ended session");
        //  to show snackbar you would need to to: history.push(`${PATHS_CORE.LOGOUT}?reason=refresh-token_expired`); and then the same logic in Logout and Login components
        if (axiosError.response) {
          if (axiosError.response.data) {
            return Promise.reject(axiosError.response.data);
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
          return Promise.reject(error.response.data);
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
