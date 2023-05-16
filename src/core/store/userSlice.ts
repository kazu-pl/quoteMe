import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "common/axios";
import {
  UserData,
  getUsetDataFromLSToken,
  removeAccessToken,
  saveAccessToken,
} from "common/auth/tokens";
import {
  DecodedToken,
  FailedReqMsg,
  RequestLoginCredentials,
  RequestRegisterCredentials,
  ResponseLoginAccessToken,
} from "types/api.types";
import { RootState } from "common/store/store";
import jwtDecode from "jwt-decode";

interface UserState {
  data: UserData;
  isProfileLoading: boolean;
}

const initialState: UserState = {
  data: {
    userEmail: getUsetDataFromLSToken()?.userEmail,
    userId: getUsetDataFromLSToken().userId,
  },
  isProfileLoading: false,
};

export const register = createAsyncThunk(
  "register",
  async (values: RequestRegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<string>(
        "/user/register",
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : (error as FailedReqMsg).message
      );
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (values: RequestLoginCredentials, { rejectWithValue, dispatch }) => {
    try {
      // response.data is accessToken
      const response = await axiosInstance.post<ResponseLoginAccessToken>(
        "/user/login",
        values
      );

      saveAccessToken(response.data);
      dispatch(setUserData(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : (error as FailedReqMsg).message
      );
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      removeAccessToken();
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : (error as FailedReqMsg).message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<string>) {
      const decodedToken = jwtDecode<DecodedToken>(action.payload);
      state.data = {
        userEmail: decodedToken.sub,
        userId: decodedToken.userLoggedId,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;
export const selectIsUserIdFetching = (state: RootState) =>
  state.user.isProfileLoading;

export default userSlice.reducer;
