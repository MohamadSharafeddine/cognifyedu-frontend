import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedClass: "Classes",
  classes: [
    {
      className: "Class1",
      teacherName: "Max Fischer",
      description: "This is a brief description of Class1",
      assignments: [
        { title: "Assignment 1", dueDate: "2024-10-10", submitted: true },
        { title: "Assignment 2", dueDate: "2024-10-11", submitted: false },
      ],
    },
    {
      className: "Class2",
      teacherName: "Jane Doe",
      description: "This is a brief description of Class2",
      assignments: [
        { title: "Assignment 1", dueDate: "2024-11-10", submitted: true },
      ],
    },
  ],
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addClass: (state, action) => {
      state.classes.push({
        ...action.payload,
        assignments: [],
      });
    },
    deleteClass: (state, action) => {
      state.classes = state.classes.filter(
        (classItem) => classItem.className !== action.payload
      );
    },
    editClass: (state, action) => {
      const { oldClassName, newClassName, newDescription } = action.payload;
      const classToEdit = state.classes.find(
        (classItem) => classItem.className === oldClassName
      );
      if (classToEdit) {
        classToEdit.className = newClassName;
        classToEdit.description = newDescription;
      }
    },
    
    selectClass: (state, action) => {
      state.selectedClass = action.payload;
    },

    addAssignment: (state, action) => {
      const { className, newAssignment } = action.payload;
      const selectedClass = state.classes.find(
        (classItem) => classItem.className === className
      );
      if (selectedClass) {
        selectedClass.assignments.push(newAssignment);
      }
    },

    deleteAssignment: (state, action) => {
      const { className, assignmentTitle } = action.payload;
      const selectedClass = state.classes.find(
        (classItem) => classItem.className === className
      );
      if (selectedClass) {
        selectedClass.assignments = selectedClass.assignments.filter(
          (assignment) => assignment.title !== assignmentTitle
        );
      }
    },

    editAssignment: (state, action) => {
      const { className, oldAssignmentTitle, updatedAssignment } = action.payload;
      const selectedClass = state.classes.find(
        (classItem) => classItem.className === className
      );
      if (selectedClass) {
        const assignmentToEdit = selectedClass.assignments.find(
          (assignment) => assignment.title === oldAssignmentTitle
        );
        if (assignmentToEdit) {
          assignmentToEdit.title = updatedAssignment.title;
          assignmentToEdit.dueDate = updatedAssignment.dueDate;
          assignmentToEdit.submitted = updatedAssignment.submitted;
        }
      }
    },
  },
});

export const {
  addClass,
  deleteClass,
  editClass,
  selectClass,
  addAssignment,
  deleteAssignment,
  editAssignment,
} = classesSlice.actions;

export default classesSlice.reducer;
