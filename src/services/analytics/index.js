import useAxios from 'hooks/useAxios';

export const getEventsHistory = async (limit = 20, page = 1, filters = '') => {
  const api = useAxios();
  try {
    let timeFilter = [];
    const params = {
      limit: limit,
      page: page,
      sortBy: 'createdAt:DESC'
    };

    if (Object.keys(filters).length) {
      if (filters.users.length) {
        params['filter.user.id'] = `$in:${filters.users.map((u) => u.id).toString()}`;
      }
      if (filters.eventTypes.length) {
        params['filter.type.id'] = `$in:${filters.eventTypes.map((e) => e.id).toString()}`;
      }
      if (filters.casinos.length) {
        params['filter.casino.id'] = `$in:${filters.casinos.map((c) => c.id).toString()}`;
      }
      if (filters.countries.length) {
        params['filter.country'] = `$in:${filters.countries.map((c) => c).toString()}`;
      }
      if (filters.from) {
        timeFilter.push(`$gte:${filters.from.format('YYYY-MM-DDTHH:mm:ssZ')}`);
      }
      if (filters.to) {
        timeFilter.push(`$lte:${filters.to.format('YYYY-MM-DDTHH:mm:ssZ')}`);
      }
      if (filters.demo) {
        params['demo'] = `true`;
      } else {
        params['demo'] = `false`;
      }
    }
    if (timeFilter.length) {
      params['filter.createdAt'] = timeFilter;
    }
    const res = await api.get('/admin/metrics', {
      params: params
    });

    const data = res.data.data.map((event) => {
      return {
        ...event,
        casino: event?.casino?.name ? event.casino.name : '-',
        username: event?.user?.nickname != null ? event.user.nickname : '-',
        timestamp: event?.createdAt ? event.createdAt : '-',
        event_type: event?.type?.name ? event.type.name : '-',
        event_type_id: event?.type?.id ? event.type.id : '-',
        amount: event?.payload?.amount != null ? event.payload.amount : '-',
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
      sortBy: 'createdAt:DESC'
    };

    if (Object.keys(filters).length) {
      if (filters.eventTypes.length) {
        params['id'] = `${filters.eventTypes.map((e) => e.id).toString()}`;
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
    date.setHours(0, 0, 0, 0);
    date = date.toJSON();

    let dateTomorrow = new Date();
    dateTomorrow.setHours(24, 0, 0, 0);
    dateTomorrow = dateTomorrow.toJSON();

    const res = await api.get(`admin/metrics/analytics-count-for-period/${type}`, {
      params: {
        limit: 100000,
        startDate: date,
        endDate: dateTomorrow
      }
    });

    return await res.data;
  } catch (error) {
    console.log(error);

    return {
      data: []
    };
  }
};

export const getGameStats = async (id) => {
  const api = useAxios();
  try {
    let amounts = [];
    const params = {
      limit: 100000,
      'filter.type.id': id
    };
    let month = new Date().getMonth();

    for (let count = 0; count < 12; count++) {
      let timeFilter = [];
      let dayFrom, dayTo;
      let correctMonth = month;

      if (month < 1) {
        dayFrom = new Date(new Date().getFullYear() - 1, month + 12, 1).toISOString();
        dayTo = new Date(new Date().getFullYear() - 1, month + 13, 1).toISOString();
        correctMonth = month + 12;
      } else {
        dayFrom = new Date(new Date().getFullYear(), month, 1).toISOString();
        dayTo = new Date(new Date().getFullYear(), month + 1, 1).toISOString();
      }

      timeFilter.push(`$gte:${dayFrom}`);
      timeFilter.push(`$lte:${dayTo}`);

      params['filter.createdAt'] = timeFilter;

      const res = await api.get('/admin/metrics/', {
        params: params
      });

      let amount = 0;
      res.data.data.map((e) => {
        amount += e.payload.amount;
      });

      amounts.unshift([correctMonth, amount]);
      month--;
    }

    return amounts;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getNewRegistrations = async () => {
  const api = useAxios();
  try {
    let amounts = [];
    const params = {
      limit: 100000,
      'filter.type.id': 1
    };
    let month = new Date().getMonth();

    for (let count = 0; count < 12; count++) {
      let timeFilter = [];
      let dayFrom, dayTo;
      let correctMonth = month;

      if (month < 1) {
        dayFrom = new Date(new Date().getFullYear() - 1, month + 13, 1).toISOString();
        dayTo = new Date(new Date().getFullYear() - 1, month + 12, 1).toISOString();
        correctMonth = month + 12;
      } else {
        dayFrom = new Date(new Date().getFullYear(), month, 1).toISOString();
        dayTo = new Date(new Date().getFullYear(), month + 1, 1).toISOString();
      }

      timeFilter.push(`$gte:${dayFrom}`);
      timeFilter.push(`$lte:${dayTo}`);

      params['filter.createdAt'] = timeFilter;

      const res = await api.get('/admin/metrics/', {
        params: params
      });

      amounts.unshift([correctMonth, res.data.data.length]);
      month--;
    }

    return amounts;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getGameSessions = async () => {
  let sessions = [0, 0, 0];
  try {
    const api = useAxios();

    let dateFrom = new Date();
    dateFrom.setHours(0, 0, 0, 0);
    dateFrom = dateFrom.toJSON();

    let dateTo = new Date();
    dateTo.setHours(24, 0, 0, 0);
    dateTo = dateTo.toJSON();

    const res = await api.get(`admin/metrics`, {
      params: {
        limit: 100000,
        startDate: dateFrom,
        endDate: dateTo,
        'filter.type.id': `$in:13,15,19`
      }
    });

    res.data.data.map((session) => {
      switch (session.type.id) {
        case 13:
          sessions[1] += 1;
          break;
        case 15:
          sessions[0] += 1;
          break;
        case 19:
          sessions[2] += 1;
          break;
      }
    });

    return sessions;
  } catch (error) {
    console.log(error);
    return {};
  }
};
