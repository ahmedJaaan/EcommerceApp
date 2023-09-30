import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
