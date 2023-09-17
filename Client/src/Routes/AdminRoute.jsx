import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../APIs/auth";

const AdminRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState("admin");

  useEffect(() => {
    if (user && user.token) {
      // console.log("User token:", user.token);
      currentAdmin(user.token)
        .then((res) => {
          // console.log("Admin role from API:", res.role);
          setIsAdmin(res.role === "admin");
        })
        .catch((err) => {
          console.log("API Error:", err);
          setIsAdmin(false);
        });
    }
  }, [user]);

  // console.log("Is Admin:", isAdmin);

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminRoute;
