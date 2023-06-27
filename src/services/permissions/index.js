import useAxios from 'hooks/useAxios';

export const getPermissions = async (limit = 20, page = 1, search = '') => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/auth/permissions', {
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
  const api = useAxios();
  try {
    return await api.get('/admin/auth/permissions/${id}');
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
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const updatePermission = async (id, action, object) => {
  const api = useAxios();
  try {
    return await api.put('/admin/auth/permissions/${id}', {
      action: action,
      object: object
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
