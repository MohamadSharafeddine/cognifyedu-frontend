import { SELECT_CLASS } from './actions';

const initialState = {
  selectedClass: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CLASS:
      return {
        ...state,
        selectedClass: action.payload,
      };
    default:
      return state;
  }
};

export default classReducer;
