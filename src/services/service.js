import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API || "http://localhost:7001/api",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 2, // Wait for request to complete in 2 seconds
});

export default instance;
