import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchPopularRecipes,
  fetchRecipeById,
  fetchFavoritesRecipes,
  addRecipeToFavorites,
  deleteRecipeFromFavorites
} from "./recipesOperations";

const slice = createSlice({
  name: "recipes",
  initialState: {
    category: null,
    items: null,
    pages: 0,
    popular: [],
    favorites: [],
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
        state.category = payload.items.length > 0 ? payload.items[0].category : null;
        state.items = payload.items;
        state.pages = Math.ceil(payload.total / payload.limit);
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
      })
      .addCase(fetchFavoritesRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const recipesReducer = slice.reducer;

// Selectors
export const selectRecipesState = (state) => state.recipes;
export const selectRecipeItems = (state) => state.recipes.items;
export const selectRecipesCategory = (state) => state.recipes.category;
export const selectPopularRecipes = (state) => state.recipes.popular;
export const selectCurrentRecipe = (state) => state.recipes.current;
export const selectRecipePages = (state) => state.recipes.pages;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavoritesRecipes = (state) => state.recipes.favorites;
