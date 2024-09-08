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
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/classes" element={<Classes />} />
          <Route path="/class/:className/*" element={<ClassPage />}>
            <Route index element={<Navigate to="assignments" />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="students" element={<Students />} />
            <Route path="marks" element={<Marks />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
