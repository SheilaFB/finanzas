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
