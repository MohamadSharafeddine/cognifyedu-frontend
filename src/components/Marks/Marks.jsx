import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Marks.css';
import defaultAvatar from '../../assets/profile.png';

const studentsData = [
  {
    name: 'Miriam Wilderman',
    avatar: 'path_to_avatar1.png',
    Marks: [85, 90, 88, 92, 87],
  },
  {
    name: 'Betsy Zboncak',
    avatar: 'path_to_avatar2.png',
    Marks: [78, 85, 83, 79, 82],
  },
  {
    name: 'Dean Senger',
    avatar: 'path_to_avatar3.png',
    Marks: [92, 93, 91, 95, 94],
  },
  {
    name: 'Katie Hackett',
    avatar: 'path_to_avatar4.png',
    Marks: [70, 72, 68, 74, 71],
  },
  {
    name: 'Seth Erdman',
    avatar: 'path_to_avatar5.png',
    Marks: [88, 90, 85, 87, 89],
  },
  {
    name: 'Priscilla Bradtke',
    avatar: 'path_to_avatar6.png',
    Marks: [82, 85, 80, 84, 83],
  },
];

const Marks = () => {
  const { searchTerm } = useOutletContext();

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Marks-list">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Grade 1</th>
            <th>Grade 2</th>
            <th>Grade 3</th>
            <th>Grade 4</th>
            <th>Grade 5</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>
                <img
                  src={student.avatar || defaultAvatar}
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                  alt="avatar"
                  className="avatar"
                />
                {student.name}
              </td>
              {student.Marks.map((grade, i) => (
                <td key={i}>{grade}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marks;
