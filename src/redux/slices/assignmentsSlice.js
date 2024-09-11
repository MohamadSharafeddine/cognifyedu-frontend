import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchAssignmentsByCourse = createAsyncThunk(
  "assignments/fetchByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/assignments/course/${courseId}`);
      console.log("Fetched Assignments:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching assignments:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);