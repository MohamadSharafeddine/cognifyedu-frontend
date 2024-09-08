import { combineReducers } from 'redux';
import classesReducer from './slices/classesSlice';
import studentsReducer from './slices/studentsSlice';

const rootReducer = combineReducers({
  classes: classesReducer,
  students: studentsReducer,
});

export default rootReducer;
