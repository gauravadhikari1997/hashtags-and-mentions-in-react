import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API || "http://localhost:7001/api",
  headers: { "Content-Type": "application/json" },
});

export default instance;
