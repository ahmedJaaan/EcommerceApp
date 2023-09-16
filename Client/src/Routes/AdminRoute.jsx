import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const location = useLocation();

  return user && user.role && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminRoute;
