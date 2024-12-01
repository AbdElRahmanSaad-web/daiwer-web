import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("auth_token"); // تحقق من وجود auth token

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }

  return children; // إذا كان مسجلاً الدخول، عرض المكون
};

export default ProtectedRoute;
