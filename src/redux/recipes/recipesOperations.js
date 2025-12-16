import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, buildQuery } from "../client";

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

export const addRecipeToFavorites = createAsyncThunk(
  "recipes/addToFavorites",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.post(`/recipes/${id}/favorite`);
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
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
