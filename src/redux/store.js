// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // This already includes studentsReducer

const store = configureStore({
  reducer: rootReducer, // rootReducer should now include both classes and students
});

export default store;
