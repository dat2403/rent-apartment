import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  responseType: 'json',
  timeout: 20000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);
