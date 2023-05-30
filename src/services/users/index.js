import useAxios from 'hooks/useAxios';

export const getUsers = async (limit = 20, page = 1, search = '') => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/users', {
      params: { limit: limit, page: page, search: search }
    });
    return {
      data: unformattedData.data.data.map((user) => {
        return {
          ...user,
          role: user.role.name
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
    return await api.get('/users/${id}');
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
