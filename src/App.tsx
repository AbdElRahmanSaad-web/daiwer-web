import React from "react";
import Register from "./pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";
import User from "./pages/User/User";

const App: React.FC = () => {
  return (
      <Routes>
      <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<User />} />
      </Routes>
  );
};

export default App;
