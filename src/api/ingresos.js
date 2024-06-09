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

export const createIngreso = async (ingresoData, token) => {
  try {
    const response = await axios.post(API_URL + "/new", ingresoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating ingreso:", error);
    throw error;
  }
};

export const modificarIngreso = async (ingresoData, token) => {
  try {
    const response = await axios.post(API_URL + "/actualizar", ingresoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating ingreso:", error);
    throw error;
  }
};

export async function eliminarIngreso(ingresoId, token) {
  try {
    const response = await axios.delete(`${API_URL}/delete/${ingresoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error eliminando ingreso:", error);
    throw error;
  }
}
