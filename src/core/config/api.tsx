import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your base URL
  timeout: 5000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// // Request Interceptor (Optional)
// api.interceptors.request.use(
//     (config) => {
//       // Add authorization token to headers if exists
//       const token = localStorage.getItem('token'); // Or use sessionStorage or context
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // Response Interceptor (Optional)
//   api.interceptors.response.use(
//     (response) => {
//       // Do something with response data (e.g., log it)
//       return response;
//     },
//     (error) => {
//       // Handle errors (e.g., logout if unauthorized)
//       if (error.response?.status === 401) {
//         // Redirect to login or clear session
//         console.log('Unauthorized access');
//       }
//       return Promise.reject(error);
//     }
//   );

export default api;
