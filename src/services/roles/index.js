import axios from 'axios';

export const getRoles = async (limit = 20, page = 1, search = '') => {
  try {
    const unformattedData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/roles`, {
      withCredentials: true,
      params: { limit: limit, page: page, search: search }
    });
    unformattedData.data.data = unformattedData.data.data.map((role) => {
      role.permissions = role.permissions
        .map((permission) => {
          return `${permission.action}: ${permission.object}`;
        })
        .join(', ');
      return role;
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

export const getRole = (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/roles/${id}`, {
    withCredentials: true
  });
};

export const createRole = (name, permissions) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/auth/roles`,
    { name: name, permissionIds: permissions },
    {
      withCredentials: true
    }
  );
};

export const updateRole = (id, name, permissions) => {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/auth/roles/${id}`,
    { name: name, permissionIds: permissions },
    {
      withCredentials: true
    }
  );
};
