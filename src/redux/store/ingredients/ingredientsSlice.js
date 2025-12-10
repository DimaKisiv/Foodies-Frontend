import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./ingredientsOperations";

const slice = createSlice({
  name: "ingredients",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
      })
      .addCase(fetchIngredients.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const ingredientsReducer = slice.reducer;

// Selectors
export const selectIngredientsState = (state) => state.ingredients;
export const selectIngredientsItems = (state) => state.ingredients.items;
export const selectIngredientsStatus = (state) => state.ingredients.status;
export const selectIngredientsError = (state) => state.ingredients.error;
