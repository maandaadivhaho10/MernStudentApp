import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
  const token = useAuthStore(state => state.token);

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the protected page
  return children;
};

export default PrivateRoute;
