import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import studentsReducer from "./slices/studentsSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
  students: studentsReducer,
  ui: uiReducer,
  auth: authReducer,
});

export default rootReducer;
