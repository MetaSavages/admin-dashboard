import useAxios from 'hooks/useAxios';

export const getPlayers = async (limit = 20, page = 1, search = '') => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/metrics/players', {
      params: { limit: limit, page: page, search: search }
    });
    return {
      data: unformattedData.data,
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0
      }
      //   meta: unformattedData.data.meta
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

export const getPlayerAggregated = async (id) => {
  const api = useAxios();
  try {
    const res = await api.get(`/admin/metrics/players/${id.id}`);
    return res.data.map((x) => {
      return {
        nickname: x.casino_name,
        time_spent: x.time_spent,
        current_balance: x.current_balance,
        starting_balance: x.starting_balance,
        money_spent: x.money_spent,
        money_cashed_out: x.money_cashed_out
      };
    });
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
