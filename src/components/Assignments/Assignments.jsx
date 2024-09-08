import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Assignments.css';
import Button from '../Button/Button';
import EditAssignmentPopup from '../EditAssignmentPopup/EditAssignmentPopup';
import DeleteConfirmationPopup from '../DeleteConfirmationPopup/DeleteConfirmationPopup';

const Assignments = () => {
  const { searchTerm, assignmentsData, setAssignmentsData } = useOutletContext();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const filteredAssignments = assignmentsData.filter((assignment) =>
    (assignment.title ? assignment.title.toLowerCase() : '').includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowEditPopup(true);
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
