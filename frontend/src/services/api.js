import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Crucial for sending HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// We generally rely on cookies for the token, so we don't necessarily need an interceptor for localStorage token, 
// but we could add response interceptors for handling 401s if needed globally here.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle generic token expiration/redirect here
    return Promise.reject(error);
  }
);

export default api;
