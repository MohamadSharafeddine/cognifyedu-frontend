import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Assignments.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const assignmentsData = [
  { title: 'Project', dueDate: '2024-10-10' },
  { title: 'Assignment', dueDate: '2024-10-11' },
  { title: 'Math test', dueDate: '2024-10-12' },
  { title: 'English test', dueDate: '2024-10-13' },
  { title: 'Science test', dueDate: '2024-10-14' },
  { title: 'History test', dueDate: '2024-10-15' },
  { title: 'Geography test', dueDate: '2024-10-16' },
  { title: 'Art test', dueDate: '2024-10-17' },
  { title: 'Music test', dueDate: '2024-10-18' },
  { title: 'PE test', dueDate: '2024-10-19' },
  { title: 'Social Studies test', dueDate: '2024-10-20' },
];

const Assignments = ({ searchTerm }) => {
  const navigate = useNavigate();

  const filteredAssignments = assignmentsData.filter((assignment) =>
    (assignment.title ? assignment.title.toLowerCase() : '').includes(searchTerm.toLowerCase())
  );

  const handleEdit = (assignment) => {
    console.log('Editing', assignment);
  };

  const handleDelete = (assignment) => {
    console.log('Deleting', assignment);
  };

  const handleRowClick = (assignment) => {
    navigate(`/assignments/${assignment.title}`);
  };

  return (
    <div className="assignments-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment, index) => (
            <tr key={index} onClick={() => handleRowClick(assignment)}>
              <td>{assignment.title}</td>
              <td>{assignment.dueDate}</td>
              <td
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Button
                  color="#25738b"
                  text="Edit"
                  size="small"
                  onClick={() => handleEdit(assignment)}
                />
                <Button
                  color="#e74c3c"
                  text="Delete"
                  size="small"
                  onClick={() => handleDelete(assignment)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
