import useAxios from 'hooks/useAxios';

export const getBlackjackTable = async (tableId) => {
  try {
    const api = useAxios();

    const res = await api.get(`blackjack/${tableId}`, {});

    return res;
  } catch (error) {
    console.log(error);
    return {};
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
