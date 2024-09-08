import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import Classes from './pages/Classes/Classes';
import ClassPage from './pages/ClassPage/ClassPage';
import Profile from './pages/Profile/Profile';
import Analysis from './pages/Profile/Analysis/Analysis';
import Cognitive from './pages/Profile/Analysis/Cognitive/Cognitive';
import Behavioral from './pages/Profile/Analysis/Behavioral/Behavioral';
import Insights from './pages/Profile/Insights/Insights';
import EditProfile from './pages/Profile/EditProfile/EditProfile';
import Assignments from './components/Assignments/Assignments';
import Students from './components/Students/Students';
import Marks from './components/Marks/Marks';

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

          <Route path="/profile" element={<Profile />}>
            <Route index element={<Navigate to="analysis/cognitive" />} />
            <Route path="analysis" element={<Analysis />}>
              <Route path="cognitive" element={<Cognitive />} />
              <Route path="behavioral" element={<Behavioral />} />
            </Route>
            <Route path="insights" element={<Insights />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/classes" />} />
      </Routes>
    </Router>
  );
}

export default App;
