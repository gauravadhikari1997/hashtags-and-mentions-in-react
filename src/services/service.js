import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_API ||
    "https://hashtags-and-mentions-server.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 8, // Wait for request to complete in 8 seconds
});

export default instance;
