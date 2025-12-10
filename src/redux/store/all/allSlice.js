import { createSlice } from "@reduxjs/toolkit";
import { fetchAll } from "./allOperations";

const slice = createSlice({
  name: "all",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload;
      })
      .addCase(fetchAll.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const allReducer = slice.reducer;

// Selectors
export const selectAllState = (state) => state.all;
export const selectAllData = (state) => state.all.data;
export const selectAllStatus = (state) => state.all.status;
export const selectAllError = (state) => state.all.error;
