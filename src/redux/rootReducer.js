import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import studentsReducer from "./slices/studentsSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import submissionsReducer from "./slices/submissionsSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
  students: studentsReducer,
  ui: uiReducer,
  auth: authReducer,
  assignments: assignmentsReducer,
  submissions: submissionsReducer,
});

export default rootReducer;
