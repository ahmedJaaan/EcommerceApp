import axios from "axios";

export const getCoupons = async () => {
  const response = await axios.get("http://localhost:8080/api/coupons");
  return response.data;
};

export const removeCoupon = async (couponId, authtoken) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/coupon/${couponId}`,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in deleting coupon", error);
    throw error;
  }
};

export const create = async (coupon, authtoken) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/coupon",
      coupon,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in creating coupon", error);
    throw error;
  }
};
