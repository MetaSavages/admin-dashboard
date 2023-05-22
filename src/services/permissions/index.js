import axios from 'axios';

export const getPermissions = async (limit = 20, page = 1, search = '') => {
  try {
    const unformattedData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/permissions`, {
      withCredentials: true,
      params: { limit: limit, page: page, search: search }
    });
    return {
      data: unformattedData.data.data,
      meta: unformattedData.data.meta
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0
      }
    };
  }
};

export const getPermission = (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/permissions/${id}`, {
    withCredentials: true
  });
};

export const createPermission = (action, object) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/auth/permissions`,
    { action: action, object: object },
    {
      withCredentials: true
    }
  );
};

export const updatePermission = (id, action, object) => {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/auth/permissions/${id}`,
    { action: action, object: object },
    {
      withCredentials: true
    }
  );
};
