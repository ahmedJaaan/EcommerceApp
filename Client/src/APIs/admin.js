import axios from "axios";

export const getOrders = async (authtoken) => {
  const response = await axios.get("http://localhost:8080/api/admin/orders", {
    headers: {
      authtoken,
    },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, orderStatus, authtoken) => {
  const response = await axios.put(
    "http://localhost:8080/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
  return response.data;
};
