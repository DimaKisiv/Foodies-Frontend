import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, buildQuery } from "../client";
import { fetchCurrent } from "../users/usersOperations";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchList",
  async (params = {}, thunkAPI) => {
    try {
      const query = buildQuery(params);
      const { data } = await api.get(`/recipes${query}`);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwn",
  async (params = {}, thunkAPI) => {
    try {
      const query = buildQuery(params);
      const { data } = await api.get(`/recipes/own${query}`);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchPopularRecipes = createAsyncThunk(
  "recipes/fetchPopular",
  async (params = {}, thunkAPI) => {
    try {
      const query = buildQuery(params);
      const { data } = await api.get(`/recipes/popular${query}`);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchFavoritesRecipes = createAsyncThunk(
  "recipes/fetchFavorites",
  async (params = {}, thunkAPI) => {
    try {
      const query = buildQuery(params);
      const { data } = await api.get(`/recipes/favorites${query}`);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * IDs для сердечок/кнопок (не для табу Favorites).
 * Backend не дає ids напряму — беремо з /recipes/favorites великим limit.
 */
export const fetchFavoriteIds = createAsyncThunk(
  "recipes/fetchFavoriteIds",
  async (_, thunkAPI) => {
    try {
      const query = buildQuery({ page: 1, limit: 5000 });
      const { data } = await api.get(`/recipes/favorites${query}`);

      const ids = (data?.items || [])
        .map((r) => String(r?.id ?? r?._id ?? ""))
        .filter(Boolean);

      return { ids };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addRecipeToFavorites = createAsyncThunk(
  "recipes/addToFavorites",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/recipes/${id}/favorite`);

      // ✅ оновити лічильник favorites у UserInfo
      thunkAPI.dispatch(fetchCurrent());

      // data: { favorites: [...] } (бек повертає id-список)
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRecipeFromFavorites = createAsyncThunk(
  "recipes/deleteFromFavorites",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/recipes/${id}/favorite`);

      // ✅ оновити лічильник favorites у UserInfo
      thunkAPI.dispatch(fetchCurrent());

      // data: { favorites: [...] } (бек повертає id-список)
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/recipes/${id}`);
      return { id, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
