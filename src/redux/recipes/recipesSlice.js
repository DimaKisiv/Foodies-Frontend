import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchPopularRecipes,
  fetchRecipeById,
  fetchFavoritesRecipes,
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} from "./recipesOperations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    popular: [],
    favorites: [],
    current: null,
    limit: 12,
    status: "idle",
    error: null,
  },
  reducers: {
    setRecipesLimit(state, { payload }) {
      state.limit = Number(payload) || state.limit;
    },
  },
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
        state.limit = payload.limit ?? state.limit ?? 12;
      })
      .addCase(fetchRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      // own list
      .addCase(fetchOwnRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
        state.limit = payload.limit ?? state.limit ?? 12;
      })
      .addCase(fetchOwnRecipes.rejected, (state, { payload }) => {
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
      })
      // add to favorites
      .addCase(addRecipeToFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addRecipeToFavorites.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.favorites = payload.favorites;
      })
      .addCase(addRecipeToFavorites.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      // remove from favorites
      .addCase(deleteRecipeFromFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteRecipeFromFavorites.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.favorites = payload.favorites;
      })
      .addCase(deleteRecipeFromFavorites.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      // fetch favorites
      .addCase(fetchFavoritesRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavoritesRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.favorites = payload.items;
        state.limit = payload.limit ?? state.limit ?? 12;
      })
      .addCase(fetchFavoritesRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { setRecipesLimit } = slice.actions;
export const recipesReducer = slice.reducer;

// Selectors
export const selectRecipesState = (state) => state.recipes;
export const selectRecipeItems = (state) => state.recipes.items;
export const selectPopularRecipes = (state) => state.recipes.popular;
export const selectCurrentRecipe = (state) => state.recipes.current;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavoritesRecipes = (state) => state.recipes.favorites;
export const selectRecipesLimit = (state) => state.recipes.limit;
// Derived total pages per section based on current arrays
// Note: totalPages is sourced from API payload or computed from total count in fulfilled handlers
