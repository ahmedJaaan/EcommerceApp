import axios from "axios"


export const createProduct = async (product, authtoken) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/product",
        product,
        {
            headers: {
                authtoken
            }
        }
      )
      return response.data;
    } catch (error) {
      console.error("Error in Creating Product:", error);
      throw error;
    }
  };