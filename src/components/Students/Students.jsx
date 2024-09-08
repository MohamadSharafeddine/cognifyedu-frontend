import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Students.css';
import defaultAvatar from '../../assets/profile.png';
import Button from '../Button/Button';
import DeleteConfirmationPopup from '../DeleteConfirmationPopup/DeleteConfirmationPopup'; 

const Students = () => {
  const { searchTerm, studentsData, setStudentsData } = useOutletContext(); 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

const Students = ({ searchTerm }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/student/${id}`);
  };

  const handleRemoveClick = (e, studentId) => {
    e.stopPropagation();
    console.log(`Remove student with ID: ${studentId}`);
  };

  const filteredStudents = studentsData.filter((student) =>
    (student.name ? student.name.toLowerCase() : '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-list">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index} onClick={() => handleRowClick(student.id)} className="clickable-row">
              <td>
                <img
                  src={student.avatar || defaultAvatar}
                  onError={(e) => { e.target.src = defaultAvatar; }}
                  alt="avatar"
                  className="avatar"
                />
                {student.name}
              </td>
              <td>
                <Button
                  color="#e74c3c"
                  text="Remove"
                  size="small"
                  onClick={(e) => handleRemoveClick(e, student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
