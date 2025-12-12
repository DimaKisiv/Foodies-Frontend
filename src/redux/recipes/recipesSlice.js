import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchPopularRecipes,
  fetchRecipeById,
} from "./recipesOperations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    popular: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
      })
      .addCase(fetchRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      // popular
      .addCase(fetchPopularRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPopularRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.popular = payload.items;
      })
      .addCase(fetchPopularRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      // by id
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.current = payload;
      })
      .addCase(fetchRecipeById.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const recipesReducer = slice.reducer;

// Selectors
export const selectRecipesState = (state) => state.recipes;
export const selectRecipeItems = (state) => state.recipes.items;
export const selectPopularRecipes = (state) => state.recipes.popular;
export const selectCurrentRecipe = (state) => state.recipes.current;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
