import { createSlice } from "@reduxjs/toolkit";
import { fetchTestimonials } from "./testimonialsOperations";

const slice = createSlice({
  name: "testimonials",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
      })
      .addCase(fetchTestimonials.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const testimonialsReducer = slice.reducer;

// Selectors
export const selectTestimonialsState = (state) => state.testimonials;
export const selectTestimonialsItems = (state) => state.testimonials.items;
export const selectTestimonialsStatus = (state) => state.testimonials.status;
export const selectTestimonialsError = (state) => state.testimonials.error;
