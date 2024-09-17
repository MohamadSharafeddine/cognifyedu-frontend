import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios"; 

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId) {
      return rejectWithValue("User ID is missing");
    }

    try {
      const response = await api.get(`/courses/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const teacherId = storedUser?.id;
    const teacherName = storedUser?.name;

    if (!teacherId) {
      return rejectWithValue("Teacher ID is missing");
    }

    const newCourse = {
      ...courseData,
      teacher_id: teacherId,
    };

    try {
      const response = await api.post("/courses", newCourse);
      return {
        ...response.data,
        teacher: { id: teacherId, name: teacherName }
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const teacherId = storedUser?.id;

    if (!teacherId) {
      return rejectWithValue("Teacher ID is missing");
    }

    const updatedCourse = {
      ...updatedData,
      teacher_id: teacherId,
    };

    try {
      const response = await api.post(`/courses/${id}`, updatedCourse);
      return { id, updatedData: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await api.delete(`/courses/${courseId}`);
      return courseId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
        .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        state.loading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const course = state.courses.find((course) => course.id === id);
        if (course) {
          Object.assign(course, updatedData);
        }
        state.loading = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default coursesSlice.reducer;
