import axios from "axios";

const API = "http://localhost:8080/task";

export default {
  getAll() {
    return axios.get(API);
  },
  create(task) {
    return axios.post(API, task);
  },
  update(id, task) {
    return axios.put(`${API}/${id}`, task);
  },
  delete(id) {
    return axios.delete(`${API}/${id}`);
  },
};
