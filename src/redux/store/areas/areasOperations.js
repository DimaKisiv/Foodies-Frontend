import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

export const fetchAreas = createAsyncThunk(
  "areas/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/areas");
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
