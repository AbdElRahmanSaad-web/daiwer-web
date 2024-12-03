import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  
  return (
    <DashboardLayout>
      <h1>Welcome to the Dashboard</h1>
    </DashboardLayout>
  );
};

export default Dashboard;

