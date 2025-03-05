import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // Adjust if necessary
  timeout: 10000,
});

export default instance;