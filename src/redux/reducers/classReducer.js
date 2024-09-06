import { SELECT_CLASS } from '../actions/classActions';

const initialState = {
  selectedClass: "Classes",
  classes: [
    { className: "Class1", teacherName: "Max Fischer", description: "Description for Class1" },
    { className: "Class2", teacherName: "Jane Doe", description: "Description for Class2" },
    { className: "Class3", teacherName: "John Smith", description: "Description for Class3" },
  ],
};

export const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_CLASS":
      return {
        ...state,
        selectedClass: action.payload,
      };

    case "ADD_CLASS":
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };

    default:
      return state;
  }
};


export default classReducer;
