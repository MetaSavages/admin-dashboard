import useAxios from 'hooks/useAxios';

export const getEventsHistory = async (limit = 20, page = 1, filters = null) => {
  const api = useAxios();
  try {
    let timeFilter = [];
    const params = {
      limit: limit, 
      page: page,     
      sortBy: 'createdAt:DESC',
    }
    
    if(Object.keys(filters).length) {
      if(filters.users.length){
        params['filter.user.id'] = `$in:${(filters.users.map((u) => u.id)).toString()}`
      }
      if(filters.eventTypes.length){
        params['filter.type.id'] =  `$in:${(filters.eventTypes.map((e) => e.id)).toString()}`;
      }
      if(filters.casinos.length){
        params['filter.casino.id']  = `$in:${(filters.casinos.map((c) => c.id)).toString()}`;
      }
      if(filters.from ){
        timeFilter.push(`$gte:${filters.from.format('YYYY-MM-DDTHH:mm:ssZ')}`);
      }
      if(filters.to ){
        timeFilter.push(`$lte:${filters.to.format('YYYY-MM-DDTHH:mm:ssZ')}`);
      }
    }
    if(timeFilter.length) {
      params['filter.createdAt'] =  timeFilter;
    }
    const res = await api.get('/metrics', {
      params: params
    });
    console.log(res);
    const data = res.data.data.map((event) => {
      return {
        ...event,
        casino: event?.casino?.name ? event.casino.name : '-',
        username: event?.user?.nickname ? event.user.nickname : '-',
        timestamp: event?.createdAt ? event.createdAt : '-',
        event_type: event?.type?.name ? event.type.name : '-',
        event_type_id: event?.type?.id ? event.type.id : '-',
        amount: event?.payload?.amount ? event.payload.amount : '-',
        gameType: event?.payload?.gameType ? event.payload.gameType : '-'
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

export const getEventsAggregated = async () => {
  const api = useAxios();
  try {
    const res = await api.get('/metrics/aggregated');
    console.log(res);
    const data = res.data.map((event) => {
      return {
        event_type: event?.name ? event.name : '-',
        calls: event?.count ? event.count : '-',
        user_calls: event?.userCount ? event.userCount : '-',
        avg_daily_calls: Math.floor(event.count / 30)
      };
    });
    return {
      data: data,
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0
      } //res.data.meta
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
