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

export async function crearCategoriaIngresoApi(token, categoriaData) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(API_URL + "/new", categoriaData, config);
    return response;
  } catch (error) {
    console.error("Error crearCategoriaIngresoApi:", error);
    throw error;
  }
}
