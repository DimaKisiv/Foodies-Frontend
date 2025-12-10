import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  register,
  fetchCurrent,
  updateAvatar,
} from "./authOperations";
import { setAuthToken } from "../../api/client";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
      state.isAuthenticated = Boolean(payload);
      setAuthToken(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      .addCase(fetchCurrent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrent.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrent.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      .addCase(updateAvatar.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        // API returns { avatarURL }. Update common avatar field for UI
        if (!state.user) state.user = {};
        state.user.avatar =
          payload.avatarURL || payload.avatar || state.user.avatar;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { setToken } = slice.actions;
export const authReducer = slice.reducer;

// Selectors
export const selectAuthState = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
