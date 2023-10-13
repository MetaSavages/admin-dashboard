import useAxios from 'hooks/useAxios';

export const getAllBlackjackTables = async (limit = 20, page = 1) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/blackjack/all-tables', {
      params: { limit: limit, page: page }
    });

    return {
      data: unformattedData.data.data.map((table, i) => {
        return {
          id: table.tableId,
          idNumber: i + 1,
          minBet: table.minBet,
          maxBet: table.maxBet,
          casinoName: table.casino.name,
          casinoProvider: table.casino.provider,
          role: table.role?.name ? user.role?.name : '-'
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

export const getBlackjackTable = async (id) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get(`/blackjack/${id}`);

    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateBlackjackTable = async (table) => {
  const api = useAxios();
  try {
    const unformattedData = await api.patch(`/blackjack/update`, table);

    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createBlackjackTable = async (casinoId) => {
  const api = useAxios();
  try {
    const unformattedData = await api.post(`/blackjack/create`, { casinoId: casinoId });

    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
