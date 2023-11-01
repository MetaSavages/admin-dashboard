import useAxios from 'hooks/useAxios';

export const getCodes = async (limit = 20, page = 1) => {
  const api = useAxios();
  try {
    const response = await api.get('/admin/auth/promo-codes', {
      params: { limit: limit, page: page }
    });
    let result;
    if (response?.data?.data?.length > 0) {
      result = response.data.data.map((el) => {
        return {
          code_id: el.id,
          code: el.code,
          claimed_user: el.claimedUser ? el.claimedUser.nickname : '',
          date_create: el.createdAt
        };
      });
    }

    return { data: result, meta: response.data.meta };
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

export const getCode = async (id) => {
  const api = useAxios();
  try {
    return await api.get(`/admin/auth/promo-code/${id}`, {});
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

export const createCodes = async (count) => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/generate-promo-codes', { count });
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

export const deleteCode = async (code) => {
  const api = useAxios();
  try {
    return await api.delete(`/admin/auth/promo-code/${code}`);
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
