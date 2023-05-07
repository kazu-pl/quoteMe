import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosSecureInstance } from "common/axios";
import {
  removeAccessToken,
  saveAccessToken,
  getAccessToken,
  saveUserId,
} from "common/auth/tokens";
import { FailedReqMsg, RequestAddQuote } from "types/api.types";
import { RootState } from "common/store/store";

interface UserState {
  userId: number | null;
  isProfileLoading: boolean;
}

const initialState: UserState = {
  userId: null,
  isProfileLoading: false,
};

export const addQuote = createAsyncThunk(
  "addQuote",
  async (values: RequestAddQuote, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/quotes/add", {
        ...values,
        token: getAccessToken(),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

const quotesSlice = createSlice({
  name: "quotesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default quotesSlice.reducer;
