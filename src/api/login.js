import axios from "axios";

const API_URL = "http://localhost:8080/auth";

const auth = {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data.token;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  async register(credentials) {
    try {
      const response = await axios.post(`${API_URL}/register`, credentials);
      return response.data.token;
    } catch (error) {
      console.error("Error en register:", error);
      throw error;
    }
  },
};

export default auth;
