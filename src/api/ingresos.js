import axios from "axios";

const API_URL = "http://localhost:8080/api/ingreso";

export async function getIngresosApi(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "/cuenta", config);
    return response;
  } catch (error) {
    console.error("Error getIngresosApi:", error);
    throw error;
  }
}

export function getTotal(ingresos) {
  let total = 0;
  ingresos.forEach((element) => {
    total += element.cantidad;
  });
  return total;
}
