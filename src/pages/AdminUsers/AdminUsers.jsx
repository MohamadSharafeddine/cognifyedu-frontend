import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./AdminUsers.css";
import TabBar from "../../components/TabBar/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/usersSlice";

const AdminUsers = () => {
  const [activeTab, setActiveTab] = useState("Teachers");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { users, loading, error } = useSelector((state) => state.users || {});

  useEffect(() => {
    dispatch(fetchUsers())
      .then((action) => {
        console.log("Fetched Users:", action.payload);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [dispatch]);
  

  useEffect(() => {
    if (location.pathname === "/admin/users") {
      navigate("/admin/users/teachers");
    }
  }, [location, navigate]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/users/${tab.toLowerCase()}`);
  };

  const tabs = ["Teachers", "Students", "Parents"];

  return (
    <div className="adminusers-container">
      <div className="adminusers-header">
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabSwitch}
        />
        <div className="adminusers-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="adminusers-content">
        {loading && <p>Loading users...</p>}
        {error && <p>Error fetching users: {JSON.stringify(error)}</p>}
        {!loading && !error && (
          <Outlet context={{ searchTerm, users }} />
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
