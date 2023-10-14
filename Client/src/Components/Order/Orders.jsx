import React from "react";
import ShowPaymentInfo from "../Cards/ShowPaymentInfo";
import styles from "../../Styles/History.module.css";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductTable from "../Cards/ProductTable";
const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id}>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              margin: "20px",
              borderRadius: "10px",
            }}
          >
            <ShowPaymentInfo order={order} styles={styles} />
            <Box sx={{ minWidth: 120, padding: "20px", paddingTop: "0px" }}>
              <FormControl fullWidth className={styles.paymentInfoItem}>
                <Select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <MenuItem value="Not Processed">Not Processed</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Cash On Delivery">Cash On Delivery</MenuItem>
                  <MenuItem value="Dispatched">Dispatched</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ProductTable order={order} styles={styles} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
