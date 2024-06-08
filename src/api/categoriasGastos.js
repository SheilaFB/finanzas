import axios from "axios";

const API_URL = "http://localhost:8080/api/categoriagasto";

export async function getCategoriasGastoApi(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "/all", config);
    return response;
  } catch (error) {
    console.error("Error getCategoriasGastoApi:", error);
    throw error;
  }
}
