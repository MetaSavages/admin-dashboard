import useAxios from 'hooks/useAxios';

export const getPermissionOptions = async () => {
  const api = useAxios();
  try {
    return await api.get('/admin/auth/permission-options');
  } catch (err) {
    console.log(err);
    return {
      data: []
    };
  }
};

export const getPermissions = async (limit = 20, page = 1) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/auth/permissions', {
      params: { limit: limit, page: page }
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

export const getAllPermissions = async () => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/auth/permissions-all');
    return {
      data: unformattedData.data
    };
  } catch (err) {
    console.log(err);
    return {
      data: []
    };
  }
};

export const getPermission = async (id) => {
  const api = useAxios();
  try {
    return await api.get(`/admin/auth/permissions/${id}`);
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
  const api = useAxios();
  try {
    return await api.post('/admin/auth/permissions', {
      action: action,
      object: object
    });
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const updatePermission = async (id, action, object) => {
  const api = useAxios();
  try {
    return await api.put(`/admin/auth/permissions/${id}`, {
      action: action,
      object: object
    });
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const deletePermission = async (id) => {
  const api = useAxios();
  return await api.delete(`/admin/auth/permissions/${id}`);
};
