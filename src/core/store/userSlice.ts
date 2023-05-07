import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, axiosSecureInstance } from "common/axios";
import {
  removeAccessToken,
  saveAccessToken,
  getAccessToken,
} from "common/auth/tokens";
import {
  // AccessToken,
  FailedReqMsg,
  // RequestRemindPasswordCredentials,
  // RequestRenewPassword,
  // RequestUpdateUser,
  // Tokens,
  RequestLoginCredentials,
  RequestRegisterCredentials,
} from "types/api.types";
import { RootState } from "common/store/store";

interface UserState {
  userId: string | null;
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

export const refreshAccessToken = async (): Promise<any> => {
  const token = getAccessToken();

  const response = await axiosInstance.post<any>("/refresh-token", {
    refreshToken: token,
  });
  saveAccessToken(response.data.accessToken);
  return response.data;
};

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    const tokens = getAccessToken();
    try {
      removeAccessToken(); // you have to remove tokens before request, removing after awaiting for response will run iunto infinite loop of redirecting between dashboard and login
      const response = await axiosInstance.post("/logout", tokens);
      return response.data;
    } catch (error) {
      removeAccessToken();
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const fetchUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axiosSecureInstance.get<any>("/users/me");
  return response.data;
});

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (values: any) => {
    const response = await axiosSecureInstance.put("/users/me", values);
    return response.data;
  }
);

export const sendEmailToRemindPassword = createAsyncThunk(
  "user/sendEmailToRemindPassword",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/remind-password",
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async (values: any & { userId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/users/renew-password/${values.userId}`,
        {
          password: values.password,
          repeatedPassword: values.repeatedPassword,
        } as any
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.put(
        `/users/me/update-password`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (values: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.put(
        `/users/me/avatar`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const deleteUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete(`/users/me/avatar`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecureInstance.delete(`/users/me/delete`);
      removeAccessToken();
      return response.data;
    } catch (error) {
      return rejectWithValue((error as FailedReqMsg).message);
    }
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
      state.userId = action.payload;
      state.isProfileLoading = false;
    });
  },
});

export const selectuserId = (state: RootState) => state.user.userId;
export const selectIsuserIdFetching = (state: RootState) =>
  state.user.isProfileLoading;

export default counterSlice.reducer;
