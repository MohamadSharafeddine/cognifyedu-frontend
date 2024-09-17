import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addParentToStudent = createAsyncThunk(
  "users/addParentToStudent",
  async ({ studentId, parentId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/${studentId}/add-parent`, { parent_id: parentId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "Failed to add parent to student");
    }
  }
);


export const fetchChildren = createAsyncThunk(
  "users/fetchChildren",
  async (parentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${parentId}/children`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    children: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete user";
      })
      .addCase(addParentToStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addParentToStudent.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload;
        const index = state.users.findIndex((user) => user.id === updatedStudent.id);
        if (index !== -1) {
          state.users[index] = updatedStudent;
        }
      })
      .addCase(addParentToStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add parent to student";
      })
      .addCase(fetchChildren.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChildren.fulfilled, (state, action) => {
        state.loading = false;
        state.children = action.payload;
      })
      .addCase(fetchChildren.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch children";
      });
  },
});

export default usersSlice.reducer;
