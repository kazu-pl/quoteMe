import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getAccessToken } from "common/auth/tokens";
import {
  FailedReqMsg,
  ResponseSingleQuote,
  RequestAddQuote,
  RequestEditQuote,
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

export const editQuote = createAsyncThunk(
  "editQuote",
  async (values: RequestEditQuote & { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/quotes/edit", {
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

export const removeQuote = createAsyncThunk(
  "removeQuote",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/quotes/delete`, {
        id,
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

const quotesSlice = createSlice({
  name: "quotesSlice",
  initialState,
  reducers: {
    setQuotesList(state, action: PayloadAction<null | ResponseSingleQuote[]>) {
      state.quotesList.data = action.payload;
    },
  },
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

export const { setQuotesList } = quotesSlice.actions;
export default quotesSlice.reducer;

export const selectQuotesList = (state: RootState) => state.quotes.quotesList;
