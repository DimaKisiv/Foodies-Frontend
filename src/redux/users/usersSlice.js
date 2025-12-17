import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchCurrent, updateAvatar } from "./usersOperations";
import { setAuthFromStorage } from "../auth/authSlice";

const slice = createSlice({
  name: "users",
  initialState: { items: [], current: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(fetchCurrent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrent.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.current = payload;
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
        if (!state.current) state.current = {};
        state.current.avatar =
          payload.avatarURL || payload.avatar || state.current.avatar;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(setAuthFromStorage, (state, { payload }) => {
        state.current = payload?.user ?? null;
      });
  },
});

export const usersReducer = slice.reducer;

// Selectors
export const selectUsersState = (state) => state.users;
export const selectUsersItems = (state) => state.users.items;
export const selectCurrentUser = (state) => state.users.current;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
