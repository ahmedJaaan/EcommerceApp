import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../APIs/auth";

const AdminRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setIsAdmin(res.role === "admin");
        })
        .catch((err) => {
          console.log("API Error:", err);
          setIsAdmin(false);
        });
    } else {
      setIsAdmin(false); // No user or token, so set isAdmin to false
    }
  }, [user]);

  // Redirect unauthenticated users to the homepage
  if (!user || !user.token) {
    return <Navigate to="/" />;
  }

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminRoute;
