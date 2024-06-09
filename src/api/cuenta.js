import axios from "axios";

const API_URL = "http://localhost:8080/api/cuenta";

export const getAccountAmount = async (token) => {
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

export const createAccount = async (cantidad, token) => {
  try {
    const response = await axios.post(API_URL + "/new", cantidad, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error crearCuenta:", error);
    throw error;
  }
};
