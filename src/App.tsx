import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
