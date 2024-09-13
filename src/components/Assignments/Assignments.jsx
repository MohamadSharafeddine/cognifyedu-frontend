import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Assignments.css";
import Button from "../Button/Button";
import EditAssignmentPopup from "../EditAssignmentPopup/EditAssignmentPopup";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";
import ViewSubmissionsPopup from "../ViewSubmissionsPopup/ViewSubmissionsPopup";
import SubmitAssignmentPopup from "../SubmitAssignmentPopup/SubmitAssignmentPopup";
import { deleteAssignment } from "../../redux/slices/assignmentsSlice";
import moment from "moment";

const Assignments = () => {
  const { searchTerm, assignments, user } = useOutletContext();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User type:", user?.type);
    console.log("Assignments data:", assignments);
  }, [user, assignments]);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowEditPopup(true);
  };

  const handleDeleteClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAssignment(selectedAssignment.id));
    setShowDeletePopup(false);
  };

  const handleRowClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowPopup(true);
  };

  return (
    <div className="assignments-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            {user?.type === "teacher" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(assignment)}
              className="assignment-row"
            >
              <td>{assignment.title}</td>
              <td>{moment(assignment.due_date).format("MMMM Do YYYY")}</td>
              {user?.type === "teacher" && (
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Button
                    color="#25738b"
                    text="Edit"
                    size="small"
                    onClick={() => handleEditClick(assignment)}
                  />
                  <Button
                    color="#e74c3c"
                    text="Remove"
                    size="small"
                    onClick={() => handleDeleteClick(assignment)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showEditPopup && (
        <EditAssignmentPopup
          assignment={selectedAssignment}
          onClose={() => setShowEditPopup(false)}
          onSave={() => setShowEditPopup(false)}
        />
      )}

      {showDeletePopup && (
        <DeleteConfirmationPopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={confirmDelete}
        />
      )}

      {showPopup &&
        selectedAssignment &&
        (user?.type === "teacher" ? (
          <ViewSubmissionsPopup
            assignmentTitle={selectedAssignment.title}
            assignmentId={selectedAssignment.id}
            onClose={() => setShowPopup(false)}
          />
        ) : (
          <SubmitAssignmentPopup
            assignment={selectedAssignment}
            onClose={() => setShowPopup(false)}
          />
        ))}
    </div>
  );
};

export default Assignments;
