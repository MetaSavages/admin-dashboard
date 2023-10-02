import useAxios from 'hooks/useAxios';

export const getCasinos = async () => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/casinos');

    return {
      data: unformattedData.data.data.map((casino) => {
        return {
          casino_name: casino.name,
          casino_id: casino.id,
          provider: casino?.provider ?? 'N/A',
          active_players: casino?.active_players ?? 'N/A'
        };
      }),
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

export const createCasino = async (name, provider) => {
  const api = useAxios();
  try {
    return await api.post('/admin/casinos', {
      name: name,
      provider: provider
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

export const deleteCasino = async (id) => {
  const api = useAxios();
  try {
    return await api.delete(`/admin/casinos/${id}`);
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
