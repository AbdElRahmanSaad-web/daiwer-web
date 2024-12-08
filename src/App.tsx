import React from "react";
import Register from "./pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/login";
import User from "./pages/User/User";
import Bin from "./pages/Bins/Bin";
import Create from "./pages/User/Create";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-user"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bins"
        element={
          <ProtectedRoute>
            <Bin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
