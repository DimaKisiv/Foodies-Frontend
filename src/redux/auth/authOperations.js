import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../client";
import {
  clearAuthFromStorage,
  saveAuthToStorage,
} from "../../services/authenticationService";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      const { token } = data;
      setAuthToken(token);
      saveAuthToStorage({ ...data, token });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      const { token } = data;
      setAuthToken(token);
      saveAuthToStorage({ ...data, token });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout");
    setAuthToken(null);
    clearAuthFromStorage();
    return true;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await api.patch("/auth/avatars", formData);
      // data: { avatarURL }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
