import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, buildQuery } from "../client";

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

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      return { id: String(id), user: data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue({ id: String(id), message });
    }
  }
);

// Followers/Following
export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async ({ userId, page = 1, limit = 12 } = {}, thunkAPI) => {
    try {
      const query = buildQuery({ page, limit });
      const path = userId
        ? `/users/${userId}/followers${query}`
        : `/users/followers${query}`;
      const { data } = await api.get(path);
      return { key: userId ? String(userId) : "me", ...data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue({
        key: userId ? String(userId) : "me",
        message,
      });
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async ({ userId, page = 1, limit = 12 } = {}, thunkAPI) => {
    try {
      const query = buildQuery({ page, limit });
      const path = userId
        ? `/users/${userId}/following${query}`
        : `/users/following${query}`;
      const { data } = await api.get(path);
      return { key: userId ? String(userId) : "me", ...data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue({
        key: userId ? String(userId) : "me",
        message,
      });
    }
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async (userId, thunkAPI) => {
    try {
      const { data } = await api.post(`/users/${userId}/follow`);
      return { userId: String(userId), ...data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue({ userId: String(userId), message });
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (userId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/users/${userId}/follow`);
      return { userId: String(userId), ...data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue({ userId: String(userId), message });
    }
  }
);

// Toggle follow/unfollow based on current Redux state
export const toggleFollowUser = createAsyncThunk(
  "users/toggleFollowUser",
  async (userId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const key = "me";
      const items = state?.users?.followingByUserId?.[key]?.items || [];
      const isFollowing = items.some(
        (u) => String(u.id ?? u._id) === String(userId)
      );

      if (isFollowing) {
        const res = await thunkAPI.dispatch(unfollowUser(userId)).unwrap();
        return { userId: String(userId), followed: false, ...res };
      }
      const res = await thunkAPI.dispatch(followUser(userId)).unwrap();
      return { userId: String(userId), followed: true, ...res };
    } catch (err) {
      const message = err?.message || "Failed to toggle follow";
      return thunkAPI.rejectWithValue({ userId: String(userId), message });
    }
  }
);
