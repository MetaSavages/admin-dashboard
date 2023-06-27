import useAxios from 'hooks/useAxios';

export const getRoles = async (limit = 20, page = 1, search = '') => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/auth/roles', {
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

export const getRole = async (id) => {
  const api = useAxios();
  try {
    return await api.get('/admin/auth/roles/${id}', {});
  } catch (err) {
    console.log(err);
    return {
      data: {
        name: '',
        permissions: []
      }
    };
  }
};

export const createRole = async (name, permissions) => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/roles', {
      name: name,
      permissionIds: permissions
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        name: '',
        permissions: []
      }
    };
  }
};

export const updateRole = async (id, name, permissions) => {
  const api = useAxios();
  try {
    return await api.put('/admin/auth/roles/${id}', {
      name: name,
      permissionIds: permissions
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        name: '',
        permissions: []
      }
    };
  }
};
