import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "common/axios";
import {
  removeAccessToken,
  saveAccessToken,
  saveUserId,
} from "common/auth/tokens";
import {
  FailedReqMsg,
  RequestLoginCredentials,
  RequestRegisterCredentials,
} from "types/api.types";
import { RootState } from "common/store/store";

interface UserState {
  userId: number | null;
  isProfileLoading: boolean;
}

const initialState: UserState = {
  userId: null,
  isProfileLoading: false,
};

export const login = createAsyncThunk(
  "login",
  async (values: RequestLoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<{ data: string }>(
        "/api/login",
        values
      );

      saveAccessToken(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (values: RequestRegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/register", values);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      removeAccessToken();
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axiosInstance.get<{ data: number }>("/api/loggedIn");
    saveUserId(response.data.data);
    return response.data;
  }
);

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isProfileLoading = true;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.userId = null;
      state.isProfileLoading = false;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userId = action.payload.data;
      state.isProfileLoading = false;
    });
  },
});

export const selectUserId = (state: RootState) => state.user.userId;
export const selectIsUserIdFetching = (state: RootState) =>
  state.user.isProfileLoading;

export default counterSlice.reducer;
