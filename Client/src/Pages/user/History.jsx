import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../APIs/user";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../Components/Cards/ShowPaymentInfo";
import styles from "../../Styles/History.module.css";
import Header from "../../Components/nav/Header";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "../../Components/Order/Invoice";
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

  useEffect(() => {
    console.log(orders.products);
  });

  const showOrderInTable = (order) => {
    return (
      <div key={order._id} className={styles.table}>
        <table style={{ textAlign: "center" }}>
          <thead className={styles.thead}>
            <tr>
              <th
                scop="col"
                style={{ background: "transparent", textAlign: "center" }}
              >
                Title
              </th>
              <th
                scop="col"
                style={{ background: "transparent", textAlign: "center" }}
              >
                Price
              </th>
              <th
                scop="col"
                style={{ background: "transparent", textAlign: "center" }}
              >
                Brand
              </th>
              <th
                scop="col"
                style={{ background: "transparent", textAlign: "center" }}
              >
                Color
              </th>
              <th
                scop="col"
                style={{ background: "transparent", textAlign: "center" }}
              >
                Count
              </th>
              <th
                scop="col"
                style={{ background: "transparent", textAlign: "center" }}
              >
                Shipping
              </th>
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
        <ShowPaymentInfo order={order} styles={styles} />
        {showOrderInTable(order)}
        {ShowPdfDownloadLink()}
      </div>
    ));

  const ShowPdfDownloadLink = () => (
    <PDFDownloadLink
      document={<Invoice orders={orders} styles={styles} />}
      fileName="invoice.pdf"
    >
      <button className={styles.downloadBtn}>Download Invoice Pdf</button>
    </PDFDownloadLink>
  );

  return (
    <div className={styles.historyContainer}>
      <Header path={"/user/history"} />
      <div style={{ padding: "20px" }}>
        <h1 className={styles.heading}>Purchase History</h1>
        <h4>{orders.length > 0 ? null : "No orders"}</h4>
        {orders.length > 0 ? showEachOrder() : "No orders"}
      </div>
    </div>
  );
};

export default History;
