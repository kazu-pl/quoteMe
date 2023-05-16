import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAccessToken } from "common/auth/tokens";
import {
  FailedReqMsg,
  ResponseSingleQuote,
  RequestAddQuote,
} from "types/api.types";
import { RootState } from "common/store/store";
import axios from "axios";

interface UserState {
  quotesList: {
    data: null | ResponseSingleQuote[];
    isLoading: boolean;
    error: string | null;
  };
  isProfileLoading: boolean;
}

const initialState: UserState = {
  quotesList: {
    data: null,
    error: null,
    isLoading: true,
  },
  isProfileLoading: false,
};

export const addQuote = createAsyncThunk(
  "addQuote",
  async (values: RequestAddQuote, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/quotes/add", {
        ...values,
        token: getAccessToken(),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : (error as FailedReqMsg).message
      );
    }
  }
);

export const getSingleUserAllQuotes = createAsyncThunk(
  "getSingleUserAllQuotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/quotes/getSingleUserAllQuotes`, {
        params: {
          token: getAccessToken(),
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        typeof error === "string" ? error : (error as FailedReqMsg).message
      );
    }
  }
);

const quotesSlice = createSlice({
  name: "quotesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleUserAllQuotes.pending, (state) => {
      state.quotesList.isLoading = true;
    });
    builder.addCase(getSingleUserAllQuotes.rejected, (state) => {
      state.quotesList.isLoading = false;
    });
    builder.addCase(getSingleUserAllQuotes.fulfilled, (state, action) => {
      state.quotesList.data = action.payload.data;
      state.quotesList.isLoading = false;
    });
  },
});

export default quotesSlice.reducer;

export const selectQuotesList = (state: RootState) => state.quotes.quotesList;
