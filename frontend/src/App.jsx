import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login'
import Register from './component/Register'
import ProtectedRoute from './component/ProtectedRoute';
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import './index.css';
import Homepage from './component/Homepage';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <Navbar />
        <div className="bg-green-50 bg-[linear-gradient(to_right, #8080800a_1px, transparent_1px), 
        linear-gradient(to_bottom, #8080800a_1px, transparent_1px)] bg-[size:14px_24px] min-h-[86.9vh]">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </DarkModeProvider>
    </Router>
  );
}

export default App;
