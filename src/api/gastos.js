import axios from "axios";

const API_URL = "http://localhost:8080/api/gasto";

export async function getGastosApi(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "/cuenta", config);
    return response;
  } catch (error) {
    console.error("Error getGastosApi:", error);
    throw error;
  }
}

export const createGasto = async (gastoData, token) => {
  try {
    const response = await axios.post(API_URL + "/new", gastoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating gasto:", error);
    throw error;
  }
};
