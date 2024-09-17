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
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    if (users) {
      const filteredParents = users.filter((user) => user.type === "parent");
      setParents(filteredParents);
    }
  }, [users]);

  const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (parent) => {
    setSelectedParent(parent);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (selectedParent) {
      dispatch(deleteUser(selectedParent.id));
      setShowDeletePopup(false);
    }
  };

  return (
    <div className="adminparents-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredParents.map((parent, index) => (
            <tr key={index}>
              <td>{parent.id}</td>
              <td>{parent.name}</td>
              <td>
                <Button
                  color="#e74c3c"
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
