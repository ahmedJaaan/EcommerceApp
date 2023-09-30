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

  export const updateProduct = async (slug, product, authtoken) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/product/${slug}`,
        product,
        {
            headers: {
                authtoken
            }
        }
      )
      return response.data;
    } catch (error) {
      console.error("Error in Updating Product:", error);
      throw error;
    }
  };

  export const getProducts = async (sort, order, page) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products",
        {
          sort,
          order,
          page
        },
      )
      return response.data;
    } catch (error) {
      console.error("Error in getting Product:", error);
      throw error;
    }
  };

export const getProductsCount = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/products/total"
    )
    return response.data;
  } catch (error) {
    console.error("Error in getting Product Count:", error);
    throw error;
  }
}


export const productStars = async (productId, star, authtoken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/product/star/${productId}`,
      {star},
      {
          headers: {
              authtoken
          }
      }
    )
    return response.data;
  } catch (error) {
    console.error("Error in Updating Star:", error);
    throw error;
  }
};


export const getRelated = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/product/related/${productId}`
    )
    return response.data;
  } catch (error) {
    console.error("Error in getting Related:", error);
    throw error;
  }
};

export const fetchProductByFilter = async (arg) => {
  try { 
    const response = await axios.post(
      "http://localhost:8080/api/search/filters",
      arg
    )
    return response.data;
  } catch (error) {
    console.error("Error in fetching products filter:", error);
    throw error;
  }
};


export const getSearch = async (arg) => {
  
}