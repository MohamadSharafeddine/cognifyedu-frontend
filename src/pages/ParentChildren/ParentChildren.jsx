import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchChildren } from "../../redux/slices/usersSlice";
import "./ParentChildren.css";

const ParentChildren = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { children, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (user && user.type === "parent") {
      dispatch(fetchChildren(user.id));
    }
  }, [dispatch, user]);

  const handleChildClick = (childId) => {
    navigate(`/profile/${childId}/analysis/cognitive`);
  };

  if (loading) {
    return <p>Loading children...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="parent-children-container">
      <table className="parent-children-table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child) => (
            <tr key={child.id} onClick={() => handleChildClick(child.id)}>
              <td>{child.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParentChildren;
