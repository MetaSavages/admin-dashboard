import axios from 'axios';
export const login = (email, password) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const getCurrentUser = () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
    withCredentials: true
  });
};

export const logout = () => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
    withCredentials: true
  });
};
