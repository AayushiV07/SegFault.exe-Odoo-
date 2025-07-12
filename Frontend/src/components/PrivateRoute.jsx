// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

