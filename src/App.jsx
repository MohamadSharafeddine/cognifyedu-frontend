import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
import Courses from "./pages/Courses/Courses";
import CoursePage from "./pages/CoursePage/CoursePage";
import Profile from "./pages/Profile/Profile";
import Analysis from "./pages/Profile/Analysis/Analysis";
import Cognitive from "./pages/Profile/Analysis/Cognitive/Cognitive";
import Behavioral from "./pages/Profile/Analysis/Behavioral/Behavioral";
import Insights from "./pages/Profile/Insights/Insights";
import EditProfile from "./pages/Profile/EditProfile/EditProfile";
import Assignments from "./components/Assignments/Assignments";
import Students from "./components/Students/Students";
import Marks from "./components/Marks/Marks";
import ViewSubmissionsPopup from "./components/ViewSubmissionsPopup/ViewSubmissionsPopup";
import DashboardTeacher from "./pages/Dashboard/DashboardTeacher";
import DashboardStudent from "./pages/Dashboard/DashboardStudent";
import DashboardParent from "./pages/Dashboard/DashboardParent";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId/*" element={<CoursePage />}>
            <Route index element={<Navigate to="assignments" />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="students" element={<Students />} />
            <Route path="marks" element={<Marks />} />
            <Route path="assignments/:assignmentTitle" element={<ViewSubmissionsPopup />} />
          </Route>

          <Route path="/profile/:userId/*" element={<Profile />}>
            <Route index element={<Navigate to="analysis/cognitive" />} />
            <Route path="analysis" element={<Analysis />}>
              <Route path="cognitive" element={<Cognitive />} />
              <Route path="behavioral" element={<Behavioral />} />
            </Route>
            <Route path="insights" element={<Insights />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>

          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute type="teacher">  
                <DashboardTeacher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute type="student">  
                <DashboardStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/parent"
            element={
              <ProtectedRoute type="parent">  
                <DashboardParent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute type="admin">  
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
