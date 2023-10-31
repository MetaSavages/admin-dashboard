import axios from 'axios';
const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
  });
  axiosInstance.interceptors.request.use(
    function (config) {
      const value = `; ${document.cookie}`;
      let parts = value.split(`; access_token=`);
      if (parts.length === 2) {
        parts = parts.pop().split(';').shift();
      }
      config.headers['Authorization'] = `Bearer ${parts}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxios;
