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

export const addAssignment = createAsyncThunk(
  "assignments/add",
  async (assignmentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", assignmentData.title);
      formData.append("description", assignmentData.description);
      formData.append("due_date", assignmentData.due_date);
      formData.append("course_id", assignmentData.course_id);
      if (assignmentData.attachment) {
        formData.append("attachment", assignmentData.attachment);
      }

      const response = await api.post(`/assignments`, formData);
      console.log("Added Assignment:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding assignment:", error.response.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAssignment = createAsyncThunk(
  "assignments/update",
  async (assignmentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", assignmentData.title);
      formData.append("description", assignmentData.description);
      formData.append("due_date", assignmentData.due_date);
      formData.append("course_id", assignmentData.course_id);
      if (assignmentData.attachment) {
        formData.append("attachment", assignmentData.attachment);
      }

      const response = await api.post(`/assignments/${assignmentData.id}`, formData);
      console.log("Updated Assignment:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating assignment:", error.response.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAssignment = createAsyncThunk(
  "assignments/delete",
  async (assignmentId, { rejectWithValue }) => {
    try {
      await api.delete(`/assignments/${assignmentId}`);
      console.log("Deleted Assignment ID:", assignmentId);
      return assignmentId;
    } catch (error) {
      console.error("Error deleting assignment:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

