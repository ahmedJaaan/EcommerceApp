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



  export const getProductsByCount = async (count) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${count}`
      )
      return response.data;
    } catch (error) {
      console.error("Error in Creating Product:", error);
      throw error;
    }
  }

  export const removeProduct = async (slug, authtoken) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/product/${slug}`,
        {
            headers: {
                authtoken
            }
        }
      )
      return response.data;
    } catch (error) {
      console.error("Error in Deleting Product:", error);
      throw error;
    }
  };


  export const getProduct = async (slug) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/${slug}`
      )
      return response.data;
    } catch (error) {
      console.error("Error in getting Product:", error);
      throw error;
    }
  }