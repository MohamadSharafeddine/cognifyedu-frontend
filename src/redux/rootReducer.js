import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import studentsReducer from "./slices/studentsSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import submissionsReducer from "./slices/submissionsSlice";
import profileReducer from "./slices/profileSlice";
import marksSlice from "./slices/marksSlice";
import usersReducer from "./slices/usersSlice";
import childrenSlice from "./slices/childrenSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
  students: studentsReducer,
  ui: uiReducer,
  auth: authReducer,
  assignments: assignmentsReducer,
  submissions: submissionsReducer,
  marks: marksSlice,
  profile: profileReducer,
  users: usersReducer,
  children: childrenSlice
});

export default rootReducer;
