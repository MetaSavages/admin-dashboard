import axios from 'axios';

export const getUsers = async (limit = 20, page = 1, search = '') => {
  try {
    const unformattedData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      withCredentials: true,
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

export const getUser = (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
    withCredentials: true
  });
};
