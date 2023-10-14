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

export const createOrder = async (authToken, stripeResponse) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/order",
      {
        stripeResponse,
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

export const getUserOrders = async (authToken) => {
  try {
    const response = await axios.get("http://localhost:8080/api/user/orders", {
      headers: {
        authToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const getWishList = async (authToken) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/user/wishlist",
      {
        headers: {
          authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting wishlist:", error);
    return error.response.data;
  }
};

export const addToWishlist = async (authToken, productId) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/user/wishlist",
      {
        productId,
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

export const removeFromWishlist = async (authToken, productId) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/user/wishlist/${productId}`,
      {
        productId,
      },
      {
        headers: {
          authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in removing from wishlist", error);
    // return error.response.data;
  }
};
