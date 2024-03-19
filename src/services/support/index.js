import useAxios from 'hooks/useAxios';

export const getTickets = async (limit = 20, page = 1, filters = '') => {
  const api = useAxios();
  try {
    const params = {
      limit: limit,
      page: page,
      sortBy: 'createdAt:DESC'
    };

    Object.keys(filters).forEach(key => {
      if (key === 'takenByAdmin') {
        if (filters[key] === 'true') {
          params[key] = true;
        } else if (filters[key] === 'false') {
          delete params[key];
        }
      } else if (filters[key] !== '') {
        params[key] = filters[key];
      }
    });

    const result = await api.get(`/support-message/tickets`, { params: params });

    const data = result.data.data.map((ticket) => {
        return {
            ...ticket,
            reason: ticket.reason ? ticket.reason.charAt(0).toUpperCase() + ticket.reason.slice(1) : '',
            taken: ticket.taken ? 'Taken' : 'Free',
            status: ticket.status ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) : ''
        }
    });

    return {
      data: data,
      meta: {
        totalItems: result.data.meta.totalItems
      }
    };
  } catch (err) {
    console.log(err);
    return {
      data: {},
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

export const getTicket = async (id) => {
  const api = useAxios();
  try {
    const result = await api.get(`/support-message/ticket/${id}`);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const sendReplyToTicket = async (id, reply) => {
  const api = useAxios();
  try {
    return await api.post(`/support-message/reply-as-admin`, {
      parentMessageId: id,
      message: reply
    });
  } catch (err) {
    console.error(err);
  }
};

export const takeTicket = async (id) => {
  const api = useAxios();
  try {
    return await api.post(`/support-message/take-ticket`, {
      MessageId: id
    });
  } catch (err) {
    console.error(err);
  }
};

export const retakeTicket = async (id) => {
  const api = useAxios();
  try {
    return await api.post(`/support-message/retake-ticket`, {
      MessageId: id
    });
  } catch (err) {
    console.error(err);
  }
};

export const closeTicket = async (id) => {
  const api = useAxios();
  try {
    return await api.post(`/support-message/close-ticket`, {
      MessageId: id,
    });
  } catch (err) {
    console.error(err);
  }
};
