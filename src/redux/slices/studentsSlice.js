// redux/slices/studentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [ // Make sure this is properly initialized
    { id: 1, name: 'Miriam Wilderman', avatar: 'path_to_avatar1.png' },
    { id: 2, name: 'Betsy Zboncak', avatar: 'path_to_avatar2.png' },
    { id: 3, name: 'Dean Senger', avatar: 'path_to_avatar3.png' },
    { id: 4, name: 'Katie Hackett', avatar: 'path_to_avatar4.png' },
    { id: 5, name: 'Seth Erdman', avatar: 'path_to_avatar5.png' },
    { id: 6, name: 'Priscilla Bradtke', avatar: 'path_to_avatar6.png' },
  ],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
});

export const { deleteStudent, addStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
