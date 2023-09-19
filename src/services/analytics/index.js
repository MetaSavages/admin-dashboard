import useAxios from 'hooks/useAxios';

export const getEventsHistory = async (limit = 20, page = 1, filters = '') => {
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
    const res = await api.get('/admin/metrics', {
      params: params
    });

    const data = res.data.data.map((event) => {
      return {
        ...event,
        casino: event?.casino?.name ? event.casino.name : '-',
        username: event?.user?.nickname ? event.user.nickname : '-',
        timestamp: event?.createdAt ? event.createdAt : '-',
        event_type: event?.type?.name ? event.type.name : '-',
        event_type_id: event?.type?.id ? event.type.id : '-',
        amount: event?.payload?.amount ? event.payload.amount : '-',
        gameType: event?.payload?.gameType ? event.payload.gameType : '-',
        country: event?.country ? event.country : '-'
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

export const getEventsAggregated = async (limit = 20, page = 1, filters = null) => {
  const api = useAxios();
  try {
    const params = {
      limit: limit, 
      page: page,     
      sortBy: 'createdAt:DESC',
    }
    
    if(Object.keys(filters).length) {
      if(filters.eventTypes.length){
        params['id'] =  `${(filters.eventTypes.map((e) => e.id)).toString()}`;
      }
    }
    const res = await api.get('/admin/metrics/aggregated', {
      params: params
    });
    console.log(res);
    const data = res.data.map((event) => {
      return {
        event_type: event?.name ? event.name : '-',
        calls: event?.count ? event.count : '-',
        user_calls: event?.userCount ? event.userCount : '-',
        avg_daily_calls: Math.floor(event.count / 30),
        id: event.id
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

export const getTodayNumbers = async (type) => {
  try {
    const api = useAxios();
    let date = new Date();
    date.setHours(0,0,0,0);
    date = date.toJSON();
  
    let dateTomorrow = new Date();
    dateTomorrow.setHours(24,0,0,0);
    dateTomorrow = dateTomorrow.toJSON();
  
    const res = await api.get(`admin/metrics/analytics-count-for-period/${type}`, {
      params: {
        startDate: date,
        endDate: dateTomorrow
      }
    });

    return await res.data;
  } catch(error) {
    console.log(error);

    return {
      data: []
    };
  }
}