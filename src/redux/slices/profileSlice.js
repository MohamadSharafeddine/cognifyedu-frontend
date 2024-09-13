import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCognitiveScores = createAsyncThunk(
  "profile/fetchCognitiveScores",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/cognitive-scores/${userId}/average`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchBehavioralScores = createAsyncThunk(
  "profile/fetchBehavioralScores",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/behavioral-scores/${userId}/average`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchInsights = createAsyncThunk(
  "profile/fetchInsights",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/insights/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    cognitiveScores: {},
    behavioralScores: {},
    insights: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCognitiveScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCognitiveScores.fulfilled, (state, action) => {
        state.cognitiveScores = action.payload;
        state.loading = false;
      })
      .addCase(fetchCognitiveScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBehavioralScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBehavioralScores.fulfilled, (state, action) => {
        state.behavioralScores = action.payload;
        state.loading = false;
      })
      .addCase(fetchBehavioralScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.insights = action.payload;
        state.loading = false;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
