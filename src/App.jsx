import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Footer from "./components/Footer/Footer";
import Classes from "./pages/Classes/Classes";
import ClassPage from "./pages/ClassPage/ClassPage";
import Profile from "./pages/Profile/Profile";
import Assignments from "./components/Assignments/Assignments";
import Students from "./components/Students/Students";
import Marks from "./components/Marks/Marks";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Classes />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
