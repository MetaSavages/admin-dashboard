import useAxios from 'hooks/useAxios';

export const getNewPlayers = async (limit = 20, page = 1) => {
  const api = useAxios();
  
  try {
    let date = new Date();
    date.setHours(0,0,0,0);
    date = date.toJSON();

    const params = {
      limit: limit, 
      page: page,     
      sortBy: 'createdAt:DESC',
      ['filter.createdDate']: `$gte:${date}`
    }

    const res = await api.get('/user', {
      params: params
    });

    const data = res.data.data.map((user) => {
      return {
        id: user?.id ? user.id : '-',
        username: user?.nickname ? user.nickname : '-',
        kyc_status: user?.kycState ? user.kycState : '-',
        refferal: user?.referral ? user.referral : '-',
      };
    });
    return {
      data: data,
      meta: res.data.meta
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

export const getPlayerCountries = async (limit = 20, page = 1) => {
  const api = useAxios();

  try {
    const params = {
      limit: limit,
      page: page,
      sortBy: 'createdAt:DESC',
    };

    const res = await api.get('/admin/metrics/active-and-registered-users-by-country', {
      params: params
    });

    const data = res.data.map((metric) => {
      return {
        country: metric?.metric_country ? metric.metric_country : '-',
        registered: metric?.registered_count ? metric.registered_count : '-',
        active: metric?.active_count ? metric.active_count : '-',
      };
    });
    return {
      data: data,
      meta: res.data.meta
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
}