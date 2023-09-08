import axios from 'axios';

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
  });

  return axiosInstance;
};

export default useAxios;
