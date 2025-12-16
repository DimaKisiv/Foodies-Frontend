import { createSlice } from "@reduxjs/toolkit";

// Stores pagination state per logical section/tab
// Key format examples:
// - my-recipes
// - my-favorites
// - my-followers
// - my-following
// - user:{id}:recipes
// - user:{id}:followers
const slice = createSlice({
  name: "pagination",
  initialState: {
    bySection: {},
  },
  reducers: {
    setPagination(state, { payload }) {
      const { section, page, totalPages, limit } = payload || {};
      if (!section) return;
      const prev = state.bySection[section] || {};
      state.bySection[section] = {
        page: Number(page ?? prev.page ?? 1),
        totalPages: Number(totalPages ?? prev.totalPages ?? 1),
        limit: Number(limit ?? prev.limit ?? 12),
      };
    },
    resetSection(state, { payload }) {
      const section = payload;
      if (!section) return;
      state.bySection[section] = { page: 1, totalPages: 1, limit: 12 };
    },
  },
});

export const { setPagination, resetSection } = slice.actions;
export const paginationReducer = slice.reducer;

// Selectors
export const selectPaginationState = (state) => state.pagination;
export const selectSectionPagination = (section) => (state) =>
  state.pagination.bySection[section] || { page: 1, totalPages: 1, limit: 12 };
