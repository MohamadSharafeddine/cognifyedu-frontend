import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AdminParents.css";
import Button from "../../../components/Button/Button";
import DeleteConfirmationPopup from "../../../components/DeleteConfirmationPopup/DeleteConfirmationPopup";
import { deleteUser } from "../../../redux/slices/usersSlice";

const AdminParents = () => {
  const { searchTerm, users } = useOutletContext();
  const dispatch = useDispatch();
  const [selectedParent, setSelectedParent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const parents = users.filter((user) => user.type === "parent");
  const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (parent) => {
    setSelectedParent(parent);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (selectedParent) {
      dispatch(deleteUser(selectedParent.id))
        .unwrap()
        .then(() => setShowDeletePopup(false))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="adminparents-list">
      <table className="adminparents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredParents.map((parent, index) => (
            <tr key={index}>
              <td>{parent.id}</td>
              <td>{parent.name}</td>
              <td>{parent.email}</td>
              <td>
                <Button
                  color="#C53030"
                  text="Delete"
                  size="small"
                  onClick={() => handleDeleteClick(parent)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <DeleteConfirmationPopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminParents;
