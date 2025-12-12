import { createSlice } from "@reduxjs/toolkit";
import { fetchAreas } from "./areasOperations";

const slice = createSlice({
  name: "areas",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
      })
      .addCase(fetchAreas.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const areasReducer = slice.reducer;

// Selectors
export const selectAreasState = (state) => state.areas;
export const selectAreasItems = (state) => state.areas.items;
export const selectAreasStatus = (state) => state.areas.status;
export const selectAreasError = (state) => state.areas.error;
