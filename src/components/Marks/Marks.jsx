import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Marks.css';
import defaultAvatar from '../../assets/profile.png';

const Marks = () => {
  const { searchTerm, marksData, students } = useOutletContext();

  const studentsData = marksData.reduce((acc, assignment) => {
    assignment.submissions.forEach((submission) => {
      const studentIndex = acc.findIndex((student) => student.id === submission.student.id);
      if (studentIndex > -1) {
        acc[studentIndex].marks.push(submission.mark);
      } else {
        const studentInfo = students.find((student) => student.id === submission.student.id);
        acc.push({
          id: submission.student.id,
          name: submission.student.name,
          avatar: studentInfo?.profile_picture
            ? `${process.env.REACT_APP_API_URL}${studentInfo.profile_picture}`
            : defaultAvatar,
          marks: [submission.mark],
        });
      }
    });
    return acc;
  }, []);

  const sortedStudentsData = [...studentsData].sort((a, b) => a.name.localeCompare(b.name));

  const filteredStudents = sortedStudentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div className="Marks-list">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            {marksData.slice(0, 5).reverse().map((assignment, index) => (
              <th key={index}>{truncateTitle(assignment.title, 15)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>
                <img
                  src={student.avatar}
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                  alt="avatar"
                  className="avatar"
                />
                {student.name}
              </td>
              {student.marks.slice(0, 5).map((mark, i) => (
                <td key={i}>{mark !== null ? mark : 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marks;
