import axios from 'axios';

export const BASE_URL =
  'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  (config) => {

    const token =
      sessionStorage.getItem('token_academia');

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default api;