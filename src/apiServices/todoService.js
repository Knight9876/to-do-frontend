import api from "../config/axiosConfig.js";

export const todoService = {
  getTodos: async () => {
    try {
      const res = await api.get("/todos");
      return res.data;
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      throw err;
    }
  },

  createTodo: async (data) => {
    try {
      const res = await api.post("/todos", data);
      return res.data;
    } catch (err) {
      console.error("Failed to create todo:", err);
      throw err;
    }
  },

  updateTodo: async (id, data) => {
    try {
      const res = await api.put(`/todos/${id}`, data);
      return res.data;
    } catch (err) {
      console.error("Failed to update todo:", err);
      throw err;
    }
  },

  deleteTodo: async (id) => {
    try {
      const res = await api.delete(`/todos/${id}`);
      return res.data;
    } catch (err) {
      console.error("Failed to delete todo:", err);
      throw err;
    }
  },
};
