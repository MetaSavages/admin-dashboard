import axios from 'axios';

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('AccessToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
