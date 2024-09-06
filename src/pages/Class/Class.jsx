import React, { useState } from "react";
import "./Class.css";
import Assignments from "../../components/Assignments/Assignments";
import Students from "../../components/Students/Students";
import Marks from "../../components/Marks/Marks";
import Button from "../../components/Button/Button";
import TabBar from "../../components/TabBar/TabBar";

const ClassPage = () => {
  const [activeTab, setActiveTab] = useState("Classwork");
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    console.log("Add button clicked");
    if (activeTab === "Classwork") {
      console.log("Classwork tab clicked");
    } else if (activeTab === "Students") {
      console.log("Students tab clicked");
    }
  };

  const tabs = ["Classwork", "Students", "Marks"];

  return (
    <div className="class-page">
      <div className="header">
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="search-and-add">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {activeTab !== "Marks" && (
            <Button
              color="#25738b"
              text="Add"
              size="medium"
              onClick={handleClick}
            />
          )}
        </div>
      </div>

      <div className="content">
        {activeTab === "Classwork" && <Assignments searchTerm={searchTerm} />}
        {activeTab === "Students" && <Students searchTerm={searchTerm} />}
        {activeTab === "Marks" && <Marks searchTerm={searchTerm} />}
      </div>
    </div>
  );
};

export default ClassPage;
