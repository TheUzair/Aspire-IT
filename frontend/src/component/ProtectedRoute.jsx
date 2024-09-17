import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  const [redirectCountdown, setRedirectCountdown] = useState(3); 

  useEffect(() => {
    if (!token) {
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear interval after 3 seconds and redirect
      const timeout = setTimeout(() => {
        clearInterval(countdownInterval);
      }, 3000);

      return () => {
        clearTimeout(timeout);
        clearInterval(countdownInterval);
      };
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold mb-4">
          You are not logged in. Redirecting you to login in {redirectCountdown}s...
        </p>
        {redirectCountdown <= 0 && <Navigate to="/" />} {/* Trigger redirect */}
      </div>
    );
  }

  return children; // Render the protected content if token exists
};

export default ProtectedRoute;
