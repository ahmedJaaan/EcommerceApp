import React, { useEffect } from "react";

const ShowPaymentInfo = ({ order, styles }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.paymentInfoContainer}>
      <div className={styles.paymentInfoItem}>
        <span>Order ID:</span>
        <span>{order.paymentIntent[0].id}</span>
      </div>

      <div className={styles.paymentInfoItem}>
        <span>Amount:</span>
        <span>
          {(order.paymentIntent[0].amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>

      <div className={styles.paymentInfoItem}>
        <span>Method:</span>
        <span>{order.paymentIntent[0].payment_method_types[0]}</span>
      </div>

      <div className={styles.paymentInfoItem}>
        <span>Payment Status:</span>
        <span>{order.paymentIntent[0].status}</span>
      </div>

      <div className={styles.paymentInfoItem}>
        <span>Ordered on:</span>
        <span>{formatDate(order.paymentIntent[0].created * 1000)}</span>
      </div>
      <div className={styles.paymentInfoItem}>
        <span>Status</span>
        <span>{order.orderStatus}</span>
      </div>
    </div>
  );
};

export default ShowPaymentInfo;
