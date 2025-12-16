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
    page: 1,
    limit: 12,
    totalPages: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    setRecipesPage(state, { payload }) {
      state.page = Number(payload) || 1;
    },
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
        state.page = payload.page ?? state.page ?? 1;
        state.limit = payload.limit ?? state.limit ?? 12;
        const total = payload.total ?? payload.count ?? payload.totalCount;
        const computedTotalPages = total
          ? Math.max(1, Math.ceil(total / (payload.limit ?? state.limit ?? 12)))
          : undefined;
        state.totalPages =
          payload.totalPages ?? computedTotalPages ?? state.totalPages ?? 1;
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
        state.page = payload.page ?? state.page ?? 1;
        state.limit = payload.limit ?? state.limit ?? 12;
        const total = payload.total ?? payload.count ?? payload.totalCount;
        const computedTotalPages = total
          ? Math.max(1, Math.ceil(total / (payload.limit ?? state.limit ?? 12)))
          : undefined;
        state.totalPages =
          payload.totalPages ?? computedTotalPages ?? state.totalPages ?? 1;
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
        state.page = payload.page ?? state.page ?? 1;
        state.limit = payload.limit ?? state.limit ?? 12;
        const total = payload.total ?? payload.count ?? payload.totalCount;
        const computedTotalPages = total
          ? Math.max(1, Math.ceil(total / (payload.limit ?? state.limit ?? 12)))
          : undefined;
        state.totalPages =
          payload.totalPages ?? computedTotalPages ?? state.totalPages ?? 1;
      })
      .addCase(fetchFavoritesRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { setRecipesPage, setRecipesLimit } = slice.actions;
export const recipesReducer = slice.reducer;

// Selectors
export const selectRecipesState = (state) => state.recipes;
export const selectRecipeItems = (state) => state.recipes.items;
export const selectPopularRecipes = (state) => state.recipes.popular;
export const selectCurrentRecipe = (state) => state.recipes.current;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavoritesRecipes = (state) => state.recipes.favorites;
export const selectRecipesPage = (state) => state.recipes.page;
export const selectRecipesLimit = (state) => state.recipes.limit;
export const selectRecipesTotalPages = (state) => state.recipes.totalPages;
