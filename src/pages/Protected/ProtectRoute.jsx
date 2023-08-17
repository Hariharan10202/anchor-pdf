import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children, isLoggedIn, loading }) => {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectRoute;
