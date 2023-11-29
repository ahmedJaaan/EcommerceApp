import axios from "axios";

export const getSubs = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/sub");
    return response.data;
  } catch (error) {
    console.error("Error in getting subs:", error);
    throw error;
  }
};

export const getSub = async (slug) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/sub/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error in getting sub:", error);
    throw error;
  }
};

export const removeSub = async (slug, authtoken) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/sub/${slug}`,
      {
        headers: {
          authtoken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("Error in Deleting Sub:", error);
    throw error;
  }
};

export const updateSub = async (slug, sub, authtoken) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/sub/${slug}`,
      sub,
      {
        headers: {
          authtoken,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in updating sub:", error);
    throw error;
  }
};

export const createSub = async (sub, authtoken) => {
  try {
    const response = await axios.post("http://localhost:8080/api/sub", sub, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Sub categories:", error);
    throw error;
  }
};
