import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error in getting categories:", error);
    throw error;
  }
};

export const getCategory = async (slug) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/category/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting category:", error);
    throw error;
  }
};

export const removeCategory = async (slug, authtoken) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/category/${slug}`,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in Deleting categories:", error);
    throw error;
  }
};

export const updateCategory = async (slug, category, authtoken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/category/${slug}`,
      category,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in updating categories:", error);
    throw error;
  }
};

export const createCategory = async (category, authtoken) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/category",
      category,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in Creating categories:", error);
    throw error;
  }
};

export const getCategorySub = async (_id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/category/subs/${_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
};
