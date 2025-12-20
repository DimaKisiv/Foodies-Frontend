import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchPopularRecipes,
  fetchRecipeById,
  fetchFavoritesRecipes,
  fetchFavoriteIds,
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
    favoritesTotalPages: 1,
    favoriteIds: [],
    current: null,
    limit: 12,
    status: "idle",
    popularRecipesStatus: "idle",
    error: null,
  },
  reducers: {
    clearRecipesList(state, { payload }) {
      state.category = payload ?? state.category;
      state.items = null;
      state.pages = 0;
      state.error = null;
      state.status = "idle";
    },
    setRecipesLimit(state, { payload }) {
      state.limit = Number(payload) || state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.category =
          payload.items?.length > 0 ? payload.items[0].category : null;
        state.items = payload.items;
        state.limit = payload.limit ?? state.limit ?? 12;
        state.pages = Math.ceil(payload.total / payload.limit);
      })
      .addCase(fetchRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
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
      .addCase(fetchFavoriteIds.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFavoriteIds.fulfilled, (state, { payload }) => {
        state.favoriteIds = payload?.ids || [];
      })
      .addCase(fetchFavoriteIds.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(addRecipeToFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addRecipeToFavorites.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const ids = (payload?.favorites || [])
          .map((x) => String(x))
          .filter(Boolean);

        state.favoriteIds = ids;
      })
      .addCase(addRecipeToFavorites.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      .addCase(deleteRecipeFromFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteRecipeFromFavorites.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const ids = (payload?.favorites || [])
          .map((x) => String(x))
          .filter(Boolean);

        state.favoriteIds = ids;
      })
      .addCase(deleteRecipeFromFavorites.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
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
      .addCase(fetchFavoritesRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavoritesRecipes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";

        state.favorites = payload.items || [];
        state.limit = payload.limit ?? state.limit ?? 12;

        const tp =
          Number(payload.totalPages || payload.total_pages) ||
          (payload.total && payload.limit
            ? Math.max(
                1,
                Math.ceil(Number(payload.total) / Number(payload.limit))
              )
            : 1);

        state.favoritesTotalPages = tp || 1;
      })
      .addCase(fetchFavoritesRecipes.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { clearRecipesList, setRecipesLimit } = slice.actions;
export const recipesReducer = slice.reducer;
export const selectRecipesState = (state) => state.recipes;
export const selectRecipeItems = (state) => state.recipes.items;
export const selectRecipesCategory = (state) => state.recipes.category;
export const selectPopularRecipes = (state) => state.recipes.popular;
export const selectCurrentRecipe = (state) => state.recipes.current;
export const selectRecipePages = (state) => state.recipes.pages;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavoritesRecipes = (state) => state.recipes.favorites;
export const selectFavoritesTotalPages = (state) =>
  state.recipes.favoritesTotalPages;
export const selectFavoriteIds = (state) => state.recipes.favoriteIds;
export const selectRecipesLimit = (state) => state.recipes.limit;
export const selectPopularRecipesStatus = (state) =>
  state.recipes.popularRecipesStatus;
