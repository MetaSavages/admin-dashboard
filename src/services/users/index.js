import useAxios from 'hooks/useAxios';

export const getUsers = async (limit = 20, page = 1) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/users', {
      params: { limit: limit, page: page }
    });

    return {
      data: unformattedData.data.data.map((user) => {
        return {
          ...user,
          role: user.role?.name ? user.role?.name : '-'
        };
      }),
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

export const getUser = async (id) => {
  const api = useAxios();
  try {
    return await api.get(`/admin/users/${id}`);
  } catch (err) {
    console.log(err);
    return {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        role: {
          id: '',
          name: ''
        }
      }
    };
  }
};

export const createUser = async (user) => {
  const api = useAxios();
  try {
    if (process.env.REACT_APP_ENV == 'PROD') {
      return await api.post('/admin/users', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        roleId: user.role.value
      });
    } else {
      return await api.post('/admin/users/dev', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        roleId: user.role.value
      });
    }
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const updateUser = async (id, user) => {
  const api = useAxios();
  try {
    if (process.env.REACT_APP_ENV == 'PROD') {
      return await api.put(`/admin/users/admin/${id}`, user);
    } else {
      return await api.put(`/admin/users/admin/dev/${id}`, user);
    }
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const deleteUser = async (id) => {
  const api = useAxios();
  return await api.delete(`/admin/users/${id}`);
};

export const resetUserPasswordAnd2Fa = async (userId) => {
  const api = useAxios();
  return await api.post(`/admin/users/reset-password-2fa`, { id: userId });
};
