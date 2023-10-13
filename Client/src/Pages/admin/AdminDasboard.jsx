import React, { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../../APIs/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../Components/Order/Orders";
import styles from "../../Styles/History.module.css";
import Header from "../../Components/nav/Header";
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
    <div className={styles.gradientBackground}>
      <Header path={"/admin/dashboard"} />
      <h1
        style={{
          textAlign: "center",
          color: "navy",
          fontWeight: "400",
          fontSize: "50px",
        }}
      >
        Process Orders
      </h1>
      <Orders orders={orders} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default AdminDasboard;
