import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../APIs/product";
import { HashLoader } from "react-spinners";
import AdminCard from "../../Components/Cards/AdminCard";

const AdminDasboard = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
    </>
  );
};

export default AdminDasboard;
