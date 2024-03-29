import dayjs from 'dayjs';
import useAxios from 'hooks/useAxios';
import Slider from 'react-slick';

export const getEventsHistory = async (limit = 20, page = 1, filters = '') => {
  const api = useAxios();
  try {
    let timeFilter = [];
    const params = {
      limit: limit,
      page: page,
      sortBy: 'createdAt:DESC'
    };
    if (filters.doNotFetchDate) {
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
    } else {
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
          params['filter.user.isDemo'] = `true`;
        } else {
          params['filter.user.isDemo'] = `false`;
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
    }
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

export const getTodayNumbers = async (type, gameType = null) => {
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
        endDate: dateTomorrow,
        gameType: gameType ? gameType : ''
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

export const getGameStats = async (type) => {
  const api = useAxios();
  try {
    let startDate = dayjs(new Date()).subtract(12, 'month')['$d'].toISOString();
    let endDate = new Date().toISOString();

    const params = {
      limit: 100000,
      type: type,
      startDate: startDate,
      endDate: endDate,
      interval: 'month'
    };

    const res = await api.get('/admin/metrics/metric-amounts-by-interval', {
      params: params
    });

    const data = res.data.map((stat) => {
      return [stat?.intervalStart ? new Date(stat.intervalStart).getMonth() : '-', stat?.amount ? stat.amount : 0];
    });

    return data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getNewRegistrations = async () => {
  const api = useAxios();
  try {
    let startDate = dayjs(new Date()).subtract(12, 'month')['$d'].toISOString();
    let endDate = new Date().toISOString();

    const params = {
      limit: 20,
      type: 'registration_start',
      interval: 'month',
      startDate: startDate,
      endDate: endDate
    };

    const res = await api.get('admin/metrics/metrics-by-interval/', {
      params: params
    });

    const data = res.data.map((registrations) => {
      return {
        month: registrations?.intervalStart ? new Date(registrations.intervalStart).getMonth() : '-',
        count: registrations?.count ? registrations.count : 0
      };
    });

    return data;
  } catch (err) {
    console.log(err);
    return [
      {
        month: '-',
        count: 0
      }
    ];
  }
};

export const getGameSessions = async () => {
  try {
    const api = useAxios();

    let dateFrom = dayjs(new Date()).subtract(24, 'hour');
    dateFrom = dateFrom.toJSON();

    let dateTo = dayjs(new Date());
    dateTo = dateTo.toJSON();

    const blackjack = await api.get(`admin/metrics/metrics-by-interval`, {
      params: {
        limit: 1,
        startDate: dateFrom,
        endDate: dateTo,
        type: `blackjack_session_start`,
        interval: 'day'
      }
    });

    const baccarat = await api.get(`admin/metrics/metrics-by-interval`, {
      params: {
        limit: 1,
        startDate: dateFrom,
        endDate: dateTo,
        type: `baccarat_session_start`,
        interval: 'day'
      }
    });

    const roulette = await api.get(`admin/metrics/metrics-by-interval`, {
      params: {
        limit: 1,
        startDate: dateFrom,
        endDate: dateTo,
        type: `roulette_session_start`,
        interval: 'day'
      }
    });

    const rouletteCount = roulette ? (roulette?.data[0]?.count ? roulette.data[0].count : '0') : '0';
    const blackjackCount = blackjack ? (blackjack?.data[0]?.count ? blackjack.data[0].count : '0') : '0';
    const baccaratCount = baccarat ? (baccarat?.data[0]?.count ? baccarat.data[0].count : '0') : '0';

    return [rouletteCount, blackjackCount, baccaratCount];
  } catch (error) {
    console.log(error);
    return [0, 0, 0];
  }
};

export const trackSuccessfulLogins = async () => {
  try {
    const api = useAxios();

    const res = await api.get(`admin/metrics`, {
      params: {
        limit: 8,
        'filter.type.id': `$in:38`,
        sortBy: 'createdAt:DESC'
      }
    });

    const data = res.data.data.map((login) => {
      let date = new Date(login.createdAt);
      return {
        username: login.user?.nickname ? login.user.nickname : '-',
        date: login.createdAt ? date.toLocaleString() : '-'
      };
    });

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getTodayAmount = async (type, gameType = null) => {
  try {
    const api = useAxios();
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toJSON();

    let dateTomorrow = new Date();
    dateTomorrow.setHours(24, 0, 0, 0);
    dateTomorrow = dateTomorrow.toJSON();

    const res = await api.get(`admin/metrics/analytics-amount-for-period/${type}`, {
      params: {
        limit: 100000,
        startDate: date,
        endDate: dateTomorrow,
        gameType: gameType ? gameType : ''
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
