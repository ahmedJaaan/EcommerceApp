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
export const emptyUserCart = async (authToken) => {
  const response = await axios.delete("http://localhost:8080/api/user/cart", {
    headers: {
      authToken,
    },
  });
  return response.data;
};

export const saveUserAddress = async (authToken, address) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/address",
      {
        address,
      },
      {
        headers: {
          authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const applyCoupon = async (coupon, authToken) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/cart/coupon",
      {
        coupon,
      },
      {
        headers: {
          authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};
