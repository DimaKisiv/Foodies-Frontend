import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../client";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      const { token } = data;
      setAuthToken(token);
      localStorage.setItem("user", JSON.stringify({...data, token}));
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
      localStorage.setItem("user", JSON.stringify({...data, token}));
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
    localStorage.removeItem('user');
    return true;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchCurrent = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/auth/current");
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
