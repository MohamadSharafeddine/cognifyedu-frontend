import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCourseId: null,
  selectedCourseName: null,
  selectedAssignment: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      state.selectedCourseId = action.payload.courseId;
      state.selectedCourseName = action.payload.courseName;
    },
    selectAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
    },
  },
});

export const { selectCourse, selectAssignment } = uiSlice.actions;
export default uiSlice.reducer;
