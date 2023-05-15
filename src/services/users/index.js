import axios from 'axios';

export const getUsers = async (limit = 20, page = 1, search = '') => {
  console.log('getUsers');
  const unformattedData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users`, {
    withCredentials: true,
    params: { limit: limit, page: page, search: search }
  });
  return {
    data: unformattedData.data.data,
    meta: unformattedData.data.meta
  };
};

export const getUser = (id) => {
  console.log('getUser');
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${id}`, {
    withCredentials: true
  });
};
