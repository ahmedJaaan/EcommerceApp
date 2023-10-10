import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../APIs/user";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../Components/Cards/ShowPaymentInfo";
import styles from "../../Styles/History.module.css";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      getUserOrders(user.token).then((res) => {
        setOrders(res);
      });
    }
  }, [user]);

  const showOrderInTable = (order) => {
    return (
      <div key={order._id} className={styles.table}>
        <table>
          <thead className={styles.thead}>
            <tr>
              <th scop="col">Title</th>
              <th scop="col">Price</th>
              <th scop="col">Brand</th>
              <th scop="col">Color</th>
              <th scop="col">Count</th>
              <th scop="col">Shipping</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p, i) => (
              <tr key={i}>
                <td>{p.product.title}</td>
                <td>{p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>{p.product.shipping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const showEachOrder = () =>
    orders.map((order, i) => (
      <div key={i} className={styles.eachOrder}>
        <p>
          <ShowPaymentInfo order={order} styles={styles} />
        </p>
        {showOrderInTable(order)}
        <div>Download Pdf</div>
      </div>
    ));

  return (
    <div className={styles.historyContainer}>
      <h1>History</h1>
      <h4>{orders.length > 0 ? "Orders" : "No orders"}</h4>
      {orders.length > 0 ? showEachOrder() : "No orders"}
    </div>
  );
};

export default History;
