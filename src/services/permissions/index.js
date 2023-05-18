import axios from 'axios';

export const getPermissions = async (limit = 20, page = 1, search = '') => {
  console.log('getPermissions');
  const unformattedData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/permissions`, {
    withCredentials: true,
    params: { limit: limit, page: page, search: search }
  });
  return {
    data: unformattedData.data.data,
    meta: unformattedData.data.meta
  };
};

export const getPermission = (id) => {
  console.log('getPermission');
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/permissions/${id}`, {
    withCredentials: true
  });
};

export const createPermission = (action, object) => {
  console.log('createPermission');
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/auth/permissions`,
    { action: action, object: object },
    {
      withCredentials: true
    }
  );
};

export const updatePermission = (id, action, object) => {
  console.log('updatePermission');
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/auth/permissions/${id}`,
    { action: action, object: object },
    {
      withCredentials: true
    }
  );
};
