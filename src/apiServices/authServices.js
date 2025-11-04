import api from "../config/axiosConfig.js";

export const authServices = {
  register: async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (err) {
      console.error("Failed to register user:", err);
      throw err;
    }
  },

  login: async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err) {
      console.error("Failed to login user:", err);
      throw err;
    }
  },
};
