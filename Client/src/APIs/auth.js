import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/create-or-update-user",
      null,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    throw error;
  }
};

export const currentUser = async (authtoken) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/current-user",
      null,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in Current User:", error);
    throw error;
  }
};
export const currentAdmin = async (authtoken) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/current-admin",
      null,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in Admin:", error);
    throw error;
  }
};
