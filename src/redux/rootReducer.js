// redux/rootReducer.js
import { combineReducers } from 'redux';
import classesReducer from './slices/classesSlice';
import studentsReducer from './slices/studentsSlice'; // Import the students slice

const rootReducer = combineReducers({
  classes: classesReducer,
  students: studentsReducer, // Combine the students reducer
});

export default rootReducer;
