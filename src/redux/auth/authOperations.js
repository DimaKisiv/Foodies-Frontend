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
      // Hydrate full current user immediately after auth
      try {
        const meRes = await api.get("/users/current");
        const hydrated = { ...data, user: meRes.data, token };
        saveAuthToStorage(hydrated);
        return hydrated;
      } catch {
        saveAuthToStorage({ ...data, token });
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const status = err.response?.status ?? null;
      return thunkAPI.rejectWithValue({ status, message });
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
      // Hydrate full current user immediately after auth
      try {
        const meRes = await api.get("/users/current");
        const hydrated = { ...data, user: meRes.data, token };
        saveAuthToStorage(hydrated);
        return hydrated;
      } catch {
        saveAuthToStorage({ ...data, token });
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const status = err.response?.status ?? null;
      return thunkAPI.rejectWithValue({ status, message });
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
    const status = err.response?.status ?? null;
    return thunkAPI.rejectWithValue({ status, message });
  }
});
