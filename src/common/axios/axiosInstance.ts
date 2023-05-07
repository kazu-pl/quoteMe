import axios, { AxiosError } from "axios";
import { FailedReqMsg } from "types/api.types";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,

  async (err) => {
    const error = err as AxiosError;

    if (error.response) {
      if (error.response.data) {
        return Promise.reject(error.response.data); // returns data object which is the data send my server so i can dispaly msg that server send to front
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
