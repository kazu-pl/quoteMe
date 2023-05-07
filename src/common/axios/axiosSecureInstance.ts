import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAccessToken } from "common/auth/tokens";
import { API_URL } from "common/constants/env";

import { PATHS_CORE } from "common/constants/paths";
import { refreshAccessToken } from "core/store/userSlice";

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
    Authorization: `Bearer ${token && token}`,
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

        try {
          await refreshAccessToken();

          return axiosSecureInstance({
            ...originalConfig,
            ...(originalConfig.data !== undefined &&
              !(originalConfig.data instanceof FormData) && {
                // if originalConfig.data is FormData (you send files) you can't pass it as a json file becuase it's not just regular object
                data: JSON.parse(originalConfig.data),
              }),
            // ALTERNATIVE: you can just hardcode the "Content-Type": "application/json" header so you can just return return axiosSecureInstance(originalConfig) without worring about parsing body or not parsing it if instance of FormData

            // originalConfig.data is stringified but you have to pass object type for axios to stringify it and send to server. If you pass jsut originalConfig without JSON.parse() then axios won't send any body (you will be able to see in browser in requests tab that it sends body, but on server you won't see any body).
            // PAY ATTENTION - pass that parsed data object ONLY if it exists becuase not every request contains body and in that base originalConfig.data would be undefined and if you parse undefined then there will be an error and it will be catched by below catch (error) {} block that does window.location.href
          });
        } catch (error) {
          // catch error when obtaining new access token failed
          const axiosError = error as AxiosError;

          window.location.href = `${PATHS_CORE.LOGIN}?$reason=sessionEnded`;
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
        }
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

// link to website based on which I created this interceptor: https://www.bezkoder.com/axios-interceptors-refresh-token/

// ----------------------------------------------------

// ################## ISSUE with react-router-dom v6 in axios interceptor ###########################
// Axios Incerceptor:
// its not possible to clone history.push() in axios interceptor like it was done in  react-router-5. The only possibility is to window.location.href = `${PATHS_CORE.LOGOUT}?reason=session_expired`;
//
// if you use history.push() you will be able to change url but application won't change its UI
//
// using window.location.href will behave like so:
// 1 - you are visiting some PrivateRoute, after refreshToken expirted you yry to update e.g. your avatar
// 2 - update avatar request will return 401 (if accessToken expired) or 403 (if refreshToken expired),
// 3 - axios interceptor will try to refresh accessToken (if avatar request returned 401) but t will get 403 because refreshToken too expired already. That error will be catched in component view function (NOT in PrivateRoute or Redux) and that component will dispaly snackbar with "forbiden - refresh token expired. Log in again"
// 4 - that snackbar will be visible only for a second (even less that 0.5s) because right after that window.location.href from axios interceptor will occur, page will be refreshed completely on /login (user will load website again for /login url)
// 5 - whole app will be downloaded again, logout request from /logout will be sent and you will be redirected to /login. (In /logout you can search for url query e.g. ?reason=refreshtokenexpired and you when redirecting to /login you can pass state object to /login page with that reason so /login page will display snackbar informig  that you were logged out because your session ended (it will be second snackbar)

// Possible solvings (for that snackbar visible for a second):
// #1 - move notistack to REDUX and in every redux action use try/catch  to check if in catch if your refreshToken expired so you won't dispatch action for showing notistack (in try you can dispatch notistack action for success action)
// that way, 1st snackbar won't show but your page will reload anyway

//  OR:

// #2 - not displaying any message from server but creating then in front components? and check if your refresh token got expired in every catch in every component that sends any requests
