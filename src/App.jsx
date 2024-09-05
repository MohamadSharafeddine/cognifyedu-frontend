import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            {/* <Route path="/" element={<Sidebar />} /> */}
          </Routes>
        </div>
        <Sidebar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
