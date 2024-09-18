import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchChildren = createAsyncThunk(
  "children/fetchChildren",
  async (_, { rejectWithValue }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const parentId = storedUser?.id;

    if (!parentId) {
      return rejectWithValue("Parent ID is missing");
    }

    try {
      const response = await api.get(`/parents/${parentId}/children`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const childrenSlice = createSlice({
  name: "children",
  initialState: {
    children: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildren.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChildren.fulfilled, (state, action) => {
        state.children = action.payload;
        state.loading = false;
      })
      .addCase(fetchChildren.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default childrenSlice.reducer;
