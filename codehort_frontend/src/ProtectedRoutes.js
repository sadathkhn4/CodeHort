import React from "react";

import {  Navigate } from "react-router-dom";
import { useAuth } from "./AuthDetails";

export default function ProtectedRoutes({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/signin" />;
}
