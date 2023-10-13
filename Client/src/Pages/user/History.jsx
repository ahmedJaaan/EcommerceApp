import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../APIs/user";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../Components/Cards/ShowPaymentInfo";
import styles from "../../Styles/History.module.css";
import Header from "../../Components/nav/Header";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "../../Components/Order/Invoice";
import ProductTable from "../../Components/Cards/ProductTable";
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

  const showEachOrder = () =>
    orders.map((order, i) => (
      <div key={i} className={styles.eachOrder}>
        <ShowPaymentInfo order={order} styles={styles} />
        <ProductTable order={order} styles={styles} />
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
