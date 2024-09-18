import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const fetchSubmissionsByAssignment = createAsyncThunk(
  'submissions/fetchByAssignment',
  async (assignmentId, { rejectWithValue }) => {
    try {
      console.log(`Fetching submissions for assignment ID: ${assignmentId}`);
      const response = await api.get(`/submissions/assignment/${assignmentId}`);
      console.log('Fetched submissions:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const markSubmission = createAsyncThunk(
  'submissions/mark',
  async ({ submissionId, markData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/submissions/${submissionId}/mark`, markData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAssignmentDetails = createAsyncThunk(
  'assignments/fetchDetails',
  async (assignmentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/assignments/${assignmentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitAssignment = createAsyncThunk(
  'submissions/submitAssignment',
  async ({ assignmentId, deliverable }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('assignment_id', assignmentId);
      formData.append('deliverable', deliverable);

      const response = await api.post('/submissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState: {
    submissions: [],
    loading: false,
    error: null,
    assignmentDetails: null,
    submissionResponse: null,
  },
  reducers: {
    clearSubmissionResponse: (state) => {
      state.submissionResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissionsByAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionsByAssignment.fulfilled, (state, action) => {
        state.submissions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubmissionsByAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markSubmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(markSubmission.fulfilled, (state, action) => {
        const updatedSubmissionIndex = state.submissions.findIndex(
          (submission) => submission.id === action.payload.id
        );
        if (updatedSubmissionIndex !== -1) {
          state.submissions[updatedSubmissionIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(markSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAssignmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.assignmentDetails = null;
      })
      .addCase(fetchAssignmentDetails.fulfilled, (state, action) => {
        state.assignmentDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssignmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.submissionResponse = action.payload;
        state.loading = false;
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubmissionResponse } = submissionsSlice.actions;
export default submissionsSlice.reducer;
