import axios, { AxiosError } from "axios";
import { API_URL } from "common/constants/env";
import { FailedReqMsg, SuccessfulReqMsg } from "types/api.types";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (err) => {
    const error = err as AxiosError;

    if (error.response) {
      if (error.response.data) {
        return Promise.reject(
          typeof error.response.data === "string"
            ? ({ message: error.response.data } as SuccessfulReqMsg)
            : error.response.data
        ); // returns data object which is the data send my server so i can dispaly msg that server send to front
      } else {
        return Promise.reject({
          message: `An error occurred but server didn't send any error data`,
        } as FailedReqMsg);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
