import dayjs from 'dayjs';
import useAxios from 'hooks/useAxios';
import { getEventsHistory } from 'services/analytics';

export const getEventTypes = async () => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('admin/metrics/types');

    const data = unformattedData.data.map((type) => {
      return {
        ...type,
        value: type?.id ? type.id : '-',
        label: type?.name
          ? type.name
              .replace(/_/g, ' ')
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          : '-'
      };
    });

    return data;
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

export const getAllCasinos = async () => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/casinos');

    const data = unformattedData.data.data.map((casino) => {
      return {
        ...casino,
        value: casino?.id ? casino.id : '-',
        label: casino?.name ? casino.name : '-'
      };
    });

    return data;
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

export const getAllPlayers = async (nickname) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/user/autocomplete', {
      params: {
        search: nickname
      }
    });

    const data = unformattedData.data.data.map((user) => {
      return {
        ...user,
        value: user?.id ? user.id : '-',
        label: user?.nickname ? user.nickname : '-'
      };
    });

    return data;
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

export const getAllCountries = async () => {
  const api = useAxios();
  try {
    const unformattedData = await getEventsHistory(1000, 1, {
      countries: [],
      users: [],
      casinos: [],
      eventTypes: [{ id: 1 }]
    });

    const data = unformattedData.data.map((e) => {
      return e.country;
    });

    const uniqueData = [...new Set(data)].filter((c) => c != '-');

    return uniqueData;
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
