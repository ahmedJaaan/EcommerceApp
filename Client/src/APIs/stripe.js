import axios from "axios";

export const createPaymentIntent = async (authtoken) => {
  const response = await axios.post(
    "http://localhost:8080/api/create-payment-intent",
    {},
    {
      headers: {
        authtoken,
      },
    },
  );
  return response.data;
};
