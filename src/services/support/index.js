import useAxios from 'hooks/useAxios';

export const sendReplyToTicket = async (id, reply) => {
  const api = useAxios();
  try {
    // return await api.post(`/admin/reply`, {
    //   id: id,
    //   reply: reply
    // });
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
