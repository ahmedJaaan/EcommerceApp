import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../APIs/product";
import { HashLoader } from "react-spinners";
import AdminCard from "../../Components/Cards/AdminCard";
import { getOrders, updateOrderStatus } from "../../APIs/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../Components/Order/Orders";
const AdminDasboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadOrders();
    console.log(orders);
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    updateOrderStatus(orderId, orderStatus, user.token).then((res) => {
      loadOrders();
      toast.success("Status updated");
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <Orders orders={orders} handleStatusChange={handleStatusChange} />
    </>
  );
};

export default AdminDasboard;
