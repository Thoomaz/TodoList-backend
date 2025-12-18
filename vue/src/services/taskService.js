import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/task",
});

export const taskService = {
  getAll() {
    return api.get("");
  },

  create(task) {
    return api.post("", task);
  },

  update(id, task) {
    return api.put(`/${id}`, task);
  },

  delete(id) {
    return api.delete(`/${id}`);
  },
};
