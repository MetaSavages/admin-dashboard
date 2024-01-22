import useAxios from 'hooks/useAxios';

export const getPlayers = async (limit = 20, page = 1, filters) => {
  const api = useAxios();
  try {
    const params = {
      limit: limit,
      page: page,
      sortBy: 'createdAt:DESC'
    };

    if (typeof filters == 'object') {
      if (Object.keys(filters).length) {
        if (filters?.search != null) {
          params['search'] = filters.search;
        }
        if (filters?.isChecked != null) {
          params['isDemo'] = filters.isChecked;
        }
      }
    }

    const unformattedData = await api.get('/admin/metrics/players', {
      params: params
    });

    return {
      data: unformattedData.data.items.map((x) => {
        return {
          id: x.u_id,
          nickname: x.u_nickname,
          time_spent: x.time_spent,
          current_balance: x.current_balance,
          starting_balance: x.starting_balance,
          money_spent: x.money_spent,
          money_cashed_out: x.money_cashed_out,
          wallet: x.u_walletId,
          location: x.u_lastLocation,
          kyc_status: x.u_kycState,
          isDemo: x.u_isDemo,
          createdDate: x.createdDate
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