import axios from "axios";

const API_URL = "http://localhost:8080/api/cuenta";

const getAccountAmount = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "/get", config);
    return response.data.cantidad;
  } catch (error) {
    console.error("Error fetching account amount:", error);
    throw error;
  }
};

export default getAccountAmount;
