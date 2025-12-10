import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, buildQuery } from "../../api/client";

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
