import React from "react";
import "./Marks.css";
import defaultAvatar from "../../assets/profile.png";

const studentsData = [
  {
    name: "Miriam Wilderman",
    avatar: "path_to_avatar1.png",
    Marks: [85, 90, 88, 92, 87],
  },
  {
    name: "Betsy Zboncak",
    avatar: "path_to_avatar2.png",
    Marks: [78, 85, 83, 79, 82],
  },
  {
    name: "Dean Senger",
    avatar: "path_to_avatar3.png",
    Marks: [92, 93, 91, 95, 94],
  },
  {
    name: "Katie Hackett",
    avatar: "path_to_avatar4.png",
    Marks: [70, 72, 68, 74, 71],
  },
  {
    name: "Seth Erdman",
    avatar: "path_to_avatar5.png",
    Marks: [88, 90, 85, 87, 89],
  },
  {
    name: "Priscilla Bradtke",
    avatar: "path_to_avatar6.png",
    Marks: [82, 85, 80, 84, 83],
  },
];

const Marks = ({ searchTerm }) => {
  const filteredStudents = studentsData.filter((student) => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="Marks-list">
    </div>
  );
};

export default Marks;
