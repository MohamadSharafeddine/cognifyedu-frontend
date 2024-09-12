import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchStudentsByCourse = createAsyncThunk(
  "students/fetchByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}/students`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addStudentToCourse = createAsyncThunk(
  "students/add",
  async ({ courseId, email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/course-students/${courseId}`, { email });
      return response.data.student;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteStudentFromCourse = createAsyncThunk(
  "students/delete",
  async ({ courseId, studentId }, { rejectWithValue }) => {
    try {
      await api.delete(`/course-students/${courseId}/${studentId}`);
      return studentId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByCourse.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudentsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudentToCourse.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(deleteStudentFromCourse.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      });
  },
});

export default studentsSlice.reducer;
