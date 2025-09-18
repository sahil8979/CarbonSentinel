import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Upload from "./components/upload/upload";
import Navbar from "./components/navbar/navbar";

const App: React.FC = () => {
  // Always start as NOT authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    localStorage.setItem("authToken", "true"); // optional: store token
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Show navbar only if logged in */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        {/* Default landing route → always go to login first */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* Protected Upload */}
        <Route
          path="/upload"
          element={
            isAuthenticated ? <Upload /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
