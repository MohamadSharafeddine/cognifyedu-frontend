import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCognitiveScores = createAsyncThunk(
  "profile/fetchCognitiveScores",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching cognitive scores for userId:", userId);
      const response = await axios.get(`/cognitive-scores/${userId}/average`);
      console.log("Cognitive Scores Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cognitive scores:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCognitiveProgress = createAsyncThunk(
  "profile/fetchCognitiveProgress",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching cognitive progress for userId:", userId);
      const response = await axios.get(`/cognitive-scores/${userId}/progress`);
      console.log("Cognitive Progress Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cognitive progress:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    cognitiveScores: {},
    cognitiveProgress: [],
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
      .addCase(fetchCognitiveProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCognitiveProgress.fulfilled, (state, action) => {
        state.cognitiveProgress = action.payload;
        state.loading = false;
      })
      .addCase(fetchCognitiveProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
