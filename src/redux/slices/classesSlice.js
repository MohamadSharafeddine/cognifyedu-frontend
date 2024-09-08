import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedClass: "Classes",
  classes: [
    { className: "Class1", teacherName: "Max Fischer", description: "This is a brief description of Class1" },
    { className: "Class2", teacherName: "Jane Doe", description: "This is a brief description of Class2" },
  ],
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    deleteClass: (state, action) => {
      state.classes = state.classes.filter(classItem => classItem.className !== action.payload);
    },
    editClass: (state, action) => {
      const { oldClassName, newClassName, newDescription } = action.payload;
      const classToEdit = state.classes.find(classItem => classItem.className === oldClassName);
      if (classToEdit) {
        classToEdit.className = newClassName;
        classToEdit.description = newDescription;
      }
    },
    selectClass: (state, action) => {
      state.selectedClass = action.payload;
    },
  },
});

export const { addClass, deleteClass, editClass, selectClass } = classesSlice.actions;
export default classesSlice.reducer;
