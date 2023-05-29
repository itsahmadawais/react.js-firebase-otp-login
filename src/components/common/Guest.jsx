import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return children;
  }
  return <Navigate to="/dashboard" />;
}
