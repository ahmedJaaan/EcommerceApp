import axios from "axios";

export const userCart = async (cart, authToken) => {
  const response = await axios.post(
    "http://localhost:8080/api/user/cart",
    {
      cart,
    },
    {
      headers: {
        authToken,
      },
    }
  );
  return response.data;
};

export const getUserCart = async (authToken) => {
  const response = await axios.get("http://localhost:8080/api/user/cart", {
    headers: {
      authToken,
    },
  });
  return response.data;
};
