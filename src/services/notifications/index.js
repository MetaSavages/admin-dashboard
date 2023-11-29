import useAxios from 'hooks/useAxios';

export const getNotifications = async (page = 1, limit = 10) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/backoffice-notifications/me', {
      params: {
        page: page,
        limit: limit
      }
    });
    return {
      data: unformattedData.data.data,
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

export const setNotificationToSeen = async (id) => {
  const api = useAxios();
  try {
    const res = await api.patch(`/admin/backoffice-notifications/${id}`, {
      seen: true
    });
    return res.data;
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

export const markAllAsRead = async () => {
  const api = useAxios();
  try {
    return await api.patch(`/admin/backoffice-notifications/mark-all-as-read`, {});
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


