import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchPopularRecipes,
  fetchRecipeById,
  fetchFavoritesRecipes,
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
  deleteRecipe,
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
    limit: 12,
    status: "idle",
    popularRecipesStatus: "idle",
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
        state.category =
          payload.items.length > 0 ? payload.items[0].category : null;
        state.items = payload.items;
        state.limit = payload.limit ?? state.limit ?? 12;
        state.pages = Math.ceil(payload.total / payload.limit);
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
        state.popularRecipesStatus = "loading";
      })
      .addCase(fetchPopularRecipes.fulfilled, (state, { payload }) => {
        state.popularRecipesStatus = "succeeded";
        state.popular = payload.items;
      })
      .addCase(fetchPopularRecipes.rejected, (state) => {
        state.popularRecipesStatus = "failed";
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
      // delete recipe (own)
      .addCase(deleteRecipe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const removedId = String(payload?.id ?? "");
        if (state.items && removedId) {
          state.items = state.items.filter(
            (r) => String(r.id ?? r._id) !== removedId
          );
        }
      })
      .addCase(deleteRecipe.rejected, (state, { payload }) => {
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
export const selectRecipesCategory = (state) => state.recipes.category;
export const selectPopularRecipes = (state) => state.recipes.popular;
export const selectCurrentRecipe = (state) => state.recipes.current;
export const selectRecipePages = (state) => state.recipes.pages;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavoritesRecipes = (state) => state.recipes.favorites;
export const selectRecipesLimit = (state) => state.recipes.limit;
export const selectPopularRecipesStatus = (state) =>
  state.recipes.popularRecipesStatus;
// Derived total pages per section based on current arrays
// Note: totalPages is sourced from API payload or computed from total count in fulfilled handlers
