import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchCurrent,
  updateAvatar,
  fetchUserById,
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from "./usersOperations";
import { setAuthFromStorage } from "../auth/authSlice";

const slice = createSlice({
  name: "users",
  initialState: {
    items: [],
    current: null,
    status: "idle",
    error: null,
    byId: {}, // map of userId -> user object
    byIdStatus: {}, // map of userId -> 'idle'|'loading'|'succeeded'|'failed'
    byIdError: {},
    followersByUserId: {}, // key: userId or 'me' -> { items, totalPages, status, error }
    followingByUserId: {}, // key: userId or 'me' -> { items, totalPages, status, error }
  },
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
      })
      // Other user profile by id
      .addCase(fetchUserById.pending, (state, { meta }) => {
        const id = String(meta?.arg ?? "");
        state.byIdStatus[id] = "loading";
        state.byIdError[id] = null;
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        const { id, user } = payload || {};
        if (!id) return;
        state.byId[id] = user;
        state.byIdStatus[id] = "succeeded";
        state.byIdError[id] = null;
      })
      .addCase(fetchUserById.rejected, (state, { payload, meta }) => {
        const id = payload?.id ?? String(meta?.arg ?? "");
        state.byIdStatus[id] = "failed";
        state.byIdError[id] =
          payload?.message || payload || "Failed to load user";
      })
      // Followers
      .addCase(fetchFollowers.pending, (state, { meta }) => {
        const key = meta?.arg?.userId ? String(meta.arg.userId) : "me";
        const prev = state.followersByUserId[key] || {};
        state.followersByUserId[key] = {
          items: prev.items || [],
          totalPages: prev.totalPages || 1,
          status: "loading",
          error: null,
        };
      })
      .addCase(fetchFollowers.fulfilled, (state, { payload }) => {
        const key = payload.key ?? "me";
        const items = payload.items || [];
        const totalPages =
          Number(payload.totalPages || payload.total_pages) ||
          (payload.total && payload.limit
            ? Math.max(
                1,
                Math.ceil(Number(payload.total) / Number(payload.limit))
              )
            : 1);
        state.followersByUserId[key] = {
          items,
          totalPages: totalPages || 1,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchFollowers.rejected, (state, { payload, meta }) => {
        const key =
          payload?.key ?? (meta?.arg?.userId ? String(meta.arg.userId) : "me");
        const prev = state.followersByUserId[key] || {};
        state.followersByUserId[key] = {
          items: prev.items || [],
          totalPages: prev.totalPages || 1,
          status: "failed",
          error: payload?.message || payload || "Failed to load followers",
        };
      })
      // Following
      .addCase(fetchFollowing.pending, (state, { meta }) => {
        const key = meta?.arg?.userId ? String(meta.arg.userId) : "me";
        const prev = state.followingByUserId[key] || {};
        state.followingByUserId[key] = {
          items: prev.items || [],
          totalPages: prev.totalPages || 1,
          status: "loading",
          error: null,
        };
      })
      .addCase(fetchFollowing.fulfilled, (state, { payload }) => {
        const key = payload.key ?? "me";
        const items = payload.items || [];
        const totalPages =
          Number(payload.totalPages || payload.total_pages) ||
          (payload.total && payload.limit
            ? Math.max(
                1,
                Math.ceil(Number(payload.total) / Number(payload.limit))
              )
            : 1);
        state.followingByUserId[key] = {
          items,
          totalPages: totalPages || 1,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchFollowing.rejected, (state, { payload, meta }) => {
        const key =
          payload?.key ?? (meta?.arg?.userId ? String(meta.arg.userId) : "me");
        const prev = state.followingByUserId[key] || {};
        state.followingByUserId[key] = {
          items: prev.items || [],
          totalPages: prev.totalPages || 1,
          status: "failed",
          error: payload?.message || payload || "Failed to load following",
        };
      })
      // Follow/Unfollow optimistic toggle in cached lists
      .addCase(followUser.fulfilled, (state, { payload }) => {
        const uid = payload.userId;
        // Mark user as followed in all followers/following lists
        Object.values(state.followersByUserId).forEach((entry) => {
          (entry.items || []).forEach((u) => {
            if (String(u.id ?? u._id) === uid) u.isFollowing = true;
          });
        });
        Object.values(state.followingByUserId).forEach((entry) => {
          (entry.items || []).forEach((u) => {
            if (String(u.id ?? u._id) === uid) u.isFollowing = true;
          });
        });
        // Optionally bump counts on current user
        if (state.current) {
          state.current.followingCount =
            Number(state.current.followingCount || 0) + 1;
        }
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        const uid = payload.userId;
        Object.values(state.followersByUserId).forEach((entry) => {
          (entry.items || []).forEach((u) => {
            if (String(u.id ?? u._id) === uid) u.isFollowing = false;
          });
        });
        Object.values(state.followingByUserId).forEach((entry) => {
          // keep item list as-is; pages may refetch. At least flip flag.
          (entry.items || []).forEach((u) => {
            if (String(u.id ?? u._id) === uid) u.isFollowing = false;
          });
        });
        if (state.current) {
          state.current.followingCount = Math.max(
            0,
            Number(state.current.followingCount || 0) - 1
          );
        }
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

// Followers/Following selectors
const emptyListState = {
  items: [],
  totalPages: 1,
  status: "idle",
  error: null,
};
export const selectFollowersFor =
  (userKey = "me") =>
  (state) =>
    state.users.followersByUserId[userKey] || emptyListState;
export const selectFollowingFor =
  (userKey = "me") =>
  (state) =>
    state.users.followingByUserId[userKey] || emptyListState;
