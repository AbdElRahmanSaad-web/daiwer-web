import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/Login");
  };
  return (
    <>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};
export default Dashboard;
