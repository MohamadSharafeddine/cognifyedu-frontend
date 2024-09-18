import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchMarks = createAsyncThunk(
  "marks/fetchMarks",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/assignments/course/${courseId}/recent-with-marks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const marksSlice = createSlice({
  name: "marks",
  initialState: {
    marksData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarks.fulfilled, (state, action) => {
        state.marksData = action.payload;
        state.loading = false;
      })
      .addCase(fetchMarks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default marksSlice.reducer;
