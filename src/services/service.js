import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_API ||
    "https://hashtags-n-mentions.herokuapp.com/api",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 2, // Wait for request to complete in 2 seconds
});

export default instance;
