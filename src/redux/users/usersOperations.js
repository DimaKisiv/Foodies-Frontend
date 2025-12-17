import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../client";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/users");
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCurrent = createAsyncThunk(
  "users/fetchCurrent",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/users/current");
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "users/updateAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await api.patch("/users/avatars", formData);
      // Expecting { avatarURL }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
