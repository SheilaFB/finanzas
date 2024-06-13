import axios from "axios";

const API_URL = process.env.VUE_APP_URL_SERVIDOR + "api/categoriagasto";

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

export async function crearCategoriaGastoApi(token, categoriaData) {
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
    console.error("Error crearGastoIngresoApi:", error);
    throw error;
  }
}
