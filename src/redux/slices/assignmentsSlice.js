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
        console.log("Attachment being sent:", assignmentData.attachment.name);
        formData.append("attachment", assignmentData.attachment);
      }

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await api.post(`/assignments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Added Assignment:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding assignment:", error.response?.data);
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
        console.log("Attachment being updated:", assignmentData.attachment.name);
        formData.append("attachment", assignmentData.attachment);
      }

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await api.post(`/assignments/${assignmentData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Updated Assignment:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating assignment:", error.response?.data);
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

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {
    assignments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentsByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentsByCourse.fulfilled, (state, action) => {
        state.assignments = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssignmentsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
        state.loading = false;
      })
      .addCase(addAssignment.rejected, (state, action) => {
        console.error("Failed to add assignment:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const updatedAssignmentIndex = state.assignments.findIndex(
          (assignment) => assignment.id === action.payload.id
        );
        if (updatedAssignmentIndex !== -1) {
          state.assignments[updatedAssignmentIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        console.error("Failed to update assignment:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (assignment) => assignment.id !== action.payload
        );
      });
  },
});

export default assignmentsSlice.reducer;
