import { combineReducers } from 'redux';
import classReducer from './classReducer';

const rootReducer = combineReducers({
  classState: classReducer,
});

export default rootReducer;
