import useAxios from 'hooks/useAxios';

export const getTickets = async () => {
  const api = useAxios();
  try {
    const result = await api.get(`/support-message/tickets`, {});

    const data = result.data.map((ticket) => {
        return {
            ...ticket,
            reason: ticket.reason ? ticket.reason.charAt(0).toUpperCase() + ticket.reason.slice(1) : '',
            taken: ticket.taken ? 'Taken' : 'Not taken',
            status: ticket.status ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) : ''
        }
    });

    return {
      data: data,
      meta: {
        totalItems: result.data.length
      }
    };
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
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
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};
