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

export const getPermission = async (id) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/permissions/${id}`, {
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const createPermission = async (action, object) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/permissions`,
      { action: action, object: object },
      {
        withCredentials: true
      }
    );
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const updatePermission = async (id, action, object) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/auth/permissions/${id}`,
      { action: action, object: object },
      {
        withCredentials: true
      }
    );
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};
