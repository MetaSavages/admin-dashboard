import axios from 'axios';

export const getRoles = async (limit = 20, page = 1, search = '') => {
  console.log('getRoles');
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
};

export const getRole = (id) => {
  console.log('getRole');
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/roles/${id}`, {
    withCredentials: true
  });
};

export const createRole = (name, permissions) => {
  console.log('createRole');
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
