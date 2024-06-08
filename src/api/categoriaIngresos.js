import axios from "axios";

const API_URL = "http://localhost:8080/api/categoriaingreso";

export async function getCategoriasIngresosApi(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "/all", config);
    return response;
  } catch (error) {
    console.error("Error getCategoriasIngresosApi:", error);
    throw error;
  }
}
